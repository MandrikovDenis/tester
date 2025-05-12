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
      .setChromeService(service) // указываем вручную сервис
      .build();

    logs.push('🔍 Проверка доступности сайта...');
    await driver.get(url);
    logs.push('✅ Сайт загружен успешно.');

    // Задержка 2 секунды
    await sleep(2000);

    logs.push('🔐 Тест авторизации...');
    const loginInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));

    await loginInput.sendKeys('test@example.com');
    await passwordInput.sendKeys('password123');
    await loginButton.click();

    // Задержка 2 секунды
    await sleep(2000);

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
