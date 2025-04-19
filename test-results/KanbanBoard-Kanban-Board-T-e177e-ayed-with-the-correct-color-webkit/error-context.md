# Test info

- Name: Kanban Board >> Task priority is displayed with the correct color
- Location: D:\Iram\WorkSpace\WebDevlopment\Project-Kanban\websocket-kanban-vitest-playwright\frontend\src\tests\KanbanBoard.test.js:63:3

# Error details

```
Error: locator.evaluate: Test timeout of 20000ms exceeded.
Call log:
  - waiting for locator('text=High Priority Task').locator('.priority-badge')

    at D:\Iram\WorkSpace\WebDevlopment\Project-Kanban\websocket-kanban-vitest-playwright\frontend\src\tests\KanbanBoard.test.js:77:39
```

# Page snapshot

```yaml
- heading "📝 Add New Task" [level=3]
- textbox "Task Title"
- textbox "Task Description"
- combobox:
  - option "Low" [selected]
  - option "Medium"
  - option "High"
- text: Upload Attachment
- button "Choose File"
- button "➕ Add Task"
- heading "Task Progress" [level=3]
- img
- heading "To Do" [level=3]
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "High Priority Task" [level=4]
- paragraph: This task is high priority.
- text: HIGH
- button "Move to In Progress"
- button "Move to Done"
- button "Delete"
- heading "In Progress" [level=3]
- heading "Done" [level=3]
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import path from 'path';
   3 | import { fileURLToPath } from 'url';
   4 | test.describe('Kanban Board', () => {
   5 |
   6 |   test.beforeEach(async ({ page }) => {
   7 |     await page.goto('http://localhost:5173'); // Replace with your actual URL if different
   8 |   });
   9 |
   10 |   // test('User can create a task', async ({ page }) => {
   11 |   //   const taskTitle = 'Test Task';
   12 |   //   const taskDescription = 'This is a test task';
   13 |
   14 |   //   // Fill in the task form
   15 |   //   await page.getByPlaceholder('Task Title').fill(taskTitle); // Make sure your form has placeholder="Task Title"
   16 |   //   await page.getByPlaceholder('Description').fill(taskDescription); // Add a placeholder in AddTaskForm if not already
   17 |   //   await page.getByRole('button', { name: 'Add Task' }).click(); // Ensure button text matches
   18 |
   19 |   //   // Wait and check if the task appears in the "To Do" column
   20 |   //   const todoColumn = await page.locator('.column').nth(0);
   21 |   //   await expect(todoColumn).toContainText(taskTitle);
   22 |   // });
   23 |
   24 |   // test('User can move task from To Do to In Progress and Done', async ({ page }) => {
   25 |   //   const taskTitle = 'Movable Task';
   26 |
   27 |   //   // Create a task
   28 |   //   await page.getByPlaceholder('Task Title').fill(taskTitle);
   29 |   //   await page.getByPlaceholder('Description').fill('To be moved');
   30 |   //   await page.getByRole('button', { name: 'Add Task' }).click();
   31 |
   32 |   //   const todoColumn = page.locator('.column').nth(0);
   33 |   //   await expect(todoColumn).toContainText(taskTitle);
   34 |
   35 |   //   // Click "Move to In Progress"
   36 |   //   await page.getByRole('button', { name: 'Move to In Progress' }).first().click();
   37 |   //   const inProgressColumn = page.locator('.column').nth(1);
   38 |   //   await expect(inProgressColumn).toContainText(taskTitle);
   39 |
   40 |   //   // Click "Move to Done"
   41 |   //   await page.getByRole('button', { name: 'Move to Done' }).first().click();
   42 |   //   const doneColumn = page.locator('.column').nth(2);
   43 |   //   await expect(doneColumn).toContainText(taskTitle);
   44 |   // });
   45 |
   46 |   // test('User can delete a task', async ({ page }) => {
   47 |   //   const taskTitle = 'Deletable Task';
   48 |
   49 |   //   // Create the task
   50 |   //   await page.getByPlaceholder('Task Title').fill(taskTitle);
   51 |   //   await page.getByPlaceholder('Description').fill('This will be deleted');
   52 |   //   await page.getByRole('button', { name: 'Add Task' }).click();
   53 |
   54 |   //   const todoColumn = page.locator('.column').nth(0);
   55 |   //   await expect(todoColumn).toContainText(taskTitle);
   56 |
   57 |   //   // Delete the task
   58 |   //   await page.getByRole('button', { name: 'Delete' }).first().click();
   59 |   //   // await expect(todoColumn).not.toContainText(taskTitle);
   60 |   // });
   61 |
   62 |
   63 |   test('Task priority is displayed with the correct color', async ({ page }) => {
   64 |     const taskTitle = 'High Priority Task';
   65 |     const taskDescription = 'This task is high priority.';
   66 |
   67 |     // Add task
   68 |     await page.getByPlaceholder('Task Title').fill(taskTitle);
   69 |     await page.getByPlaceholder('Description').fill(taskDescription);
   70 |     await page.selectOption('#priority', 'High'); // Assuming priority is selected from a dropdown
   71 |     await page.getByRole('button', { name: 'Add Task' }).click();
   72 |
   73 |     // Verify priority color (Red for High)
   74 |     const taskCard = page.locator(`text=${taskTitle}`);
   75 |     const priorityBadge = page.locator('text=High Priority Task').locator('.priority-badge');
   76 |     console.log(priorityBadge)
>  77 |     const color = await priorityBadge.evaluate(node => window.getComputedStyle(node).backgroundColor);
      |                                       ^ Error: locator.evaluate: Test timeout of 20000ms exceeded.
   78 |     expect(color).toBe('rgb(255, 0, 0)'); // or whatever color your 'High' class applies
   79 |     
   80 |     // const color = await priorityBadge.evaluate(el => el.style.backgroundColor);
   81 |
   82 |         // expect(color).toBe('rgb(255, 0, 0)'); // Red color
   83 |   });
   84 |
   85 |
   86 |   // test('File attachment is displayed correctly', async ({ page }) => {
   87 |     
   88 |
   89 |   //   // Fill in task title
   90 |   //   await page.getByPlaceholder('Task Title').fill('Test Task');
   91 |
   92 |     
   93 |   //   // Fill in description
   94 |   //   await page.getByPlaceholder('Description').fill('This is a test task with a file.');
   95 |
   96 |   //   // Attach a file
   97 |
   98 |   //   const __filename = fileURLToPath(import.meta.url);
   99 |   //   const __dirname = path.dirname(__filename);
  100 |   //   const filePath = `D:\\Iram\\WorkSpace\\WebDevlopment\\Project-Kanban\\websocket-kanban-vitest-playwright\\frontend\\src\\tests\\test-assests\\Avatar.png`;
  101 |   //   // const filePath = path.resolve(__dirname, './test-assets/sample-image.png'); // Make sure this file exists
  102 |   //   const fileInput = page.locator('#file-upload');
  103 |   //   await fileInput.setInputFiles(filePath);
  104 |
  105 |   //   // Submit the form
  106 |   //   await page.getByRole('button', { name: 'Add Task' }).click();
  107 |
  108 |   //   // Wait for the preview to appear
  109 |   //   const preview = page.locator('.preview');
  110 |   //   await expect(preview).toBeVisible({ timeout: 10000 });
  111 |
  112 |   //   // Check that an image preview or link appears
  113 |   //   const previewImage = preview.locator('img.uploaded-preview');
  114 |   //   const previewLink = preview.locator('a');
  115 |
  116 |   //   if (await previewImage.count() > 0) {
  117 |   //     await expect(previewImage).toBeVisible();
  118 |   //   } else {
  119 |   //     await expect(previewLink).toBeVisible();
  120 |   //     await expect(previewLink).toHaveAttribute('href', /http:\/\/localhost:5000\/uploads\//);
  121 |   //   }
  122 |   // });
  123 |
  124 |   // });
  125 |   // test('Task progress chart updates when tasks are added or moved', async ({ page }) => {
  126 |   //   const taskTitle = 'Chart Task';
  127 |   //   const taskDescription = 'This task will update the progress chart.';
  128 |
  129 |   //   // Add task to "To Do"
  130 |   //   await page.getByPlaceholder('Task Title').fill(taskTitle);
  131 |   //   await page.getByPlaceholder('Description').fill(taskDescription);
  132 |   //   await page.getByRole('button', { name: 'Add Task' }).click();
  133 |
  134 |   //   // Check that chart updates after task is added to "To Do"
  135 |   //   const progressChart = page.locator('.task-progress-chart');
  136 |   //   await expect(progressChart).toBeVisible();  // Check if the chart is visible
  137 |
  138 |
  139 |   //   // Move task to "In Progress" and check if the chart updates
  140 |   //   await page.getByRole('button', { name: 'Move to In Progress' }).first().click();
  141 |   //   await expect(progressChart).toBeVisible();  // Check if the chart is visible
  142 |
  143 |   // });
  144 |
  145 |
  146 |
  147 |
  148 |
  149 |
  150 |
  151 |
  152 | });
  153 |
```