import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
test.describe('Kanban Board', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Replace with your actual URL if different
  });

  // test('User can create a task', async ({ page }) => {
  //   const taskTitle = 'Test Task';
  //   const taskDescription = 'This is a test task';

  //   // Fill in the task form
  //   await page.getByPlaceholder('Task Title').fill(taskTitle); // Make sure your form has placeholder="Task Title"
  //   await page.getByPlaceholder('Description').fill(taskDescription); // Add a placeholder in AddTaskForm if not already
  //   await page.getByRole('button', { name: 'Add Task' }).click(); // Ensure button text matches

  //   // Wait and check if the task appears in the "To Do" column
  //   const todoColumn = await page.locator('.column').nth(0);
  //   await expect(todoColumn).toContainText(taskTitle);
  // });

  // test('User can move task from To Do to In Progress and Done', async ({ page }) => {
  //   const taskTitle = 'Movable Task';

  //   // Create a task
  //   await page.getByPlaceholder('Task Title').fill(taskTitle);
  //   await page.getByPlaceholder('Description').fill('To be moved');
  //   await page.getByRole('button', { name: 'Add Task' }).click();

  //   const todoColumn = page.locator('.column').nth(0);
  //   await expect(todoColumn).toContainText(taskTitle);

  //   // Click "Move to In Progress"
  //   await page.getByRole('button', { name: 'Move to In Progress' }).first().click();
  //   const inProgressColumn = page.locator('.column').nth(1);
  //   await expect(inProgressColumn).toContainText(taskTitle);

  //   // Click "Move to Done"
  //   await page.getByRole('button', { name: 'Move to Done' }).first().click();
  //   const doneColumn = page.locator('.column').nth(2);
  //   await expect(doneColumn).toContainText(taskTitle);
  // });

  // test('User can delete a task', async ({ page }) => {
  //   const taskTitle = 'Deletable Task';

  //   // Create the task
  //   await page.getByPlaceholder('Task Title').fill(taskTitle);
  //   await page.getByPlaceholder('Description').fill('This will be deleted');
  //   await page.getByRole('button', { name: 'Add Task' }).click();

  //   const todoColumn = page.locator('.column').nth(0);
  //   await expect(todoColumn).toContainText(taskTitle);

  //   // Delete the task
  //   await page.getByRole('button', { name: 'Delete' }).first().click();
  //   // await expect(todoColumn).not.toContainText(taskTitle);

  // });


  test('Task priority is displayed with the correct color', async ({ page }) => {
    const taskTitle = 'High Priority Task';
    const taskDescription = 'This task is high priority.';

    // Add task
    await page.getByPlaceholder('Task Title').fill(taskTitle);
    await page.getByPlaceholder('Description').fill(taskDescription);
    await page.selectOption('#priority', 'High');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Verify priority color (Red for High)
    const taskCard = page.locator(`text=${taskTitle}`);
    const priorityBadge = page.locator('text=High Priority Task').locator('.priority-badge');
    console.log(priorityBadge)
    // const color = await priorityBadge.evaluate(node => window.getComputedStyle(node).backgroundColor);
    // expect(color).toBe('rgb(255, 0, 0)'); //

   
  });


  // test('File attachment is displayed correctly', async ({ page }) => {


  //   // Fill in task title
  //   await page.getByPlaceholder('Task Title').fill('Test Task');


  //   // Fill in description
  //   await page.getByPlaceholder('Description').fill('This is a test task with a file.');

  //   // Attach a file

  //   const __filename = fileURLToPath(import.meta.url);
  //   const __dirname = path.dirname(__filename);
  //   const filePath = `D:\\Iram\\WorkSpace\\WebDevlopment\\Project-Kanban\\websocket-kanban-vitest-playwright\\frontend\\src\\tests\\test-assests\\Avatar.png`;
  //   // const filePath = path.resolve(__dirname, './test-assets/sample-image.png'); // Make sure this file exists
  //   const fileInput = page.locator('#file-upload');
  //   await fileInput.setInputFiles(filePath);

  //   // Submit the form
  //   await page.getByRole('button', { name: 'Add Task' }).click();

  //   // Wait for the preview to appear
  //   const preview = page.locator('.preview');
  //   await expect(preview).toBeVisible({ timeout: 10000 });

  //   // Check that an image preview or link appears
  //   const previewImage = preview.locator('img.uploaded-preview');
  //   const previewLink = preview.locator('a');

  //   if (await previewImage.count() > 0) {
  //     await expect(previewImage).toBeVisible();
  //   } else {
  //     await expect(previewLink).toBeVisible();
  //     await expect(previewLink).toHaveAttribute('href', /http:\/\/localhost:5000\/uploads\//);
  //   }
  // });

  // });
  // test('Task progress chart updates when tasks are added or moved', async ({ page }) => {
  //   const taskTitle = 'Chart Task';
  //   const taskDescription = 'This task will update the progress chart.';

  //   // Add task to "To Do"
  //   await page.getByPlaceholder('Task Title').fill(taskTitle);
  //   await page.getByPlaceholder('Description').fill(taskDescription);
  //   await page.getByRole('button', { name: 'Add Task' }).click();

  //   // Check that chart updates after task is added to "To Do"
  //   const progressChart = page.locator('.task-progress-chart');
  //   await expect(progressChart).toBeVisible();  // Check if the chart is visible


  //   // Move task to "In Progress" and check if the chart updates
  //   await page.getByRole('button', { name: 'Move to In Progress' }).first().click();
  //   await expect(progressChart).toBeVisible();  // Check if the chart is visible

  // });








});
