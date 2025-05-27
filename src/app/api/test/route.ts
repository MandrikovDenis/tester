import { NextResponse } from 'next/server';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { saveTestResult } from '@/lib/logStore';
import crypto from 'crypto';
import path from 'path';

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  const logs: string[] = [];
  const testId = crypto.randomUUID();

  // Указываем путь к chromedriver.exe
  const chromeDriverPath = 'C:\\Users\\mdyu2\\Desktop\\Диплом\\tester-master\\node_modules\\chromedriver\\lib\\chromedriver\\chromedriver.exe'; // путь к драйверу
  
  const options = new chrome.Options();
  options.addArguments('--disable-gpu', '--no-sandbox'); // без headless режима

  const service = new chrome.ServiceBuilder(chromeDriverPath);

  let driver;

  // Функция для задержки
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service) 
      .build();

    logs.push('🔍 Проверка доступности сайта...');
    await driver.get(url);
    logs.push('✅ Сайт загружен успешно.');

    // Задержка 2 секунды
    await sleep(2000);

    logs.push('🔐 Тест авторизации...');
    let loginInput = await driver.findElement(By.name('email'));
    let passwordInput = await driver.findElement(By.name('password'));
    let loginButton = await driver.findElement(By.css('button[type="submit"]'));

    const loginTests = [
      { email: 'invalid@example.com', password: 'password123', expectedSuccess: false },
      { email: 'test@example.com', password: 'wrongpass', expectedSuccess: false },
      { email: 'test@example.com', password: `' OR 1=1 --`, expectedSuccess: false },
      { email: 'test@example.com', password: '<script>', expectedSuccess: false },
      { email: 'test@example.com', password: 'password123', expectedSuccess: true },
    ];

    let loginSuccess = false; // Переменная для отслеживания успешного логина

    for (const test of loginTests) {
      logs.push(`🔐 Пробуем логин: ${test.email} / ${test.password}`);

      await loginInput.clear();
      await passwordInput.clear();
      await loginInput.sendKeys(test.email);
      await passwordInput.sendKeys(test.password);
      await loginButton.click();
      await sleep(1000);

      const currentUrl = await driver.getCurrentUrl();

      if (test.expectedSuccess) {
        await driver.wait(until.urlContains('/dashboard'), 3000);
        logs.push('✅ Успешный вход прошёл корректно.');
        loginSuccess = true; // Успешный логин
        break; // Прерываем цикл, так как авторизация прошла успешно
      } else {
        await sleep(1000); // Подождать, что не было перехода
        const currentUrl = await driver.getCurrentUrl();
        if (!currentUrl.includes('/dashboard')) {
          logs.push('✅ Ошибка входа корректно обработана.');
        } else {
          logs.push('❌ Ошибка: был переход при неправильных данных.');
        }
      }

      // Перезагрузка страницы перед следующей попыткой
      await driver.get(url);
      await sleep(1000);

      // Повторный поиск элементов (страница перезагружена)
      loginInput = await driver.findElement(By.name('email'));
      passwordInput = await driver.findElement(By.name('password'));
      loginButton = await driver.findElement(By.css('button[type="submit"]'));
    }

    if (!loginSuccess) {
      throw new Error('Не удалось авторизоваться с корректными данными');
    }

    // После успешного логина проверяем, что мы на /dashboard
    await driver.wait(until.urlContains('dashboard'), 5000);
    logs.push('✅ Авторизация прошла успешно.');

    // Задержка 2 секунды
    await sleep(2000);

    logs.push('📄 Переход на страницу формы...');
    const formLink = await driver.findElement(By.linkText('Форма'));
    await formLink.click();

    await driver.wait(until.urlContains('form'), 5000);
    logs.push('✅ Переход прошёл успешно.');

    // Задержка 2 секунды
    await sleep(2000);

    logs.push('📝 Проверка формы...');
    const nameInput = await driver.findElement(By.name('name'));
    const messageInput = await driver.findElement(By.name('message'));
    await nameInput.sendKeys('Test Name');
    await messageInput.sendKeys('Test Message');

    // Задержка 2 секунды
    await sleep(2000);

    logs.push('✅ Форма заполнена успешно.');

    saveTestResult(testId, { status: 'success', logs });

    return NextResponse.json({ status: 'success', logs, testId });

  } catch (error: any) {
    logs.push(`❌ Ошибка: ${error.message}`);
    saveTestResult(testId, { status: 'fail', logs });

    return NextResponse.json({ status: 'fail', logs, testId }, { status: 500 });

  } finally {
    if (driver) await driver.quit();
  }
}
