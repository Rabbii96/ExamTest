import { test, expect } from "@playwright/test";
import LoginPage from "./LoginPage";

test.describe("User Course Tests", () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test("Navigate to My Course and List Courses", async ({ page }) => {
        await loginPage.login(
            "https://userweb.utkorsho.org/",
            "01729888542",
            "456789"
        );

        // Click "আমার কোর্স"
        const myCourseLink = page.locator('a:text("আমার কোর্স")');
        await myCourseLink.waitFor({ state: "visible", timeout: 5000 });
        await myCourseLink.click();
        // Wait for courses to load
        await page.waitForSelector('a[href^="/panel/courses/"] h6');

        // Extract and print course titles
        const courses = await page.$$eval('a[href^="/panel/courses/"] h6', courseElements =>
            courseElements.map(el => el.textContent.trim())
        );

        console.log('Course List:');
        courses.forEach((title, index) => {
            console.log(`${index + 1}. ${title}`);
        });
        // Wait until at least one course is visible
        await page.waitForSelector('a[href^="/panel/courses/"]');

        const targetCourseName = "Special Math Course";

        // Find all course links
        const courseElements = await page.$$('a[href^="/panel/courses/"]');

        console.log('Course List:');
        let found = false;

        for (const courseEl of courseElements) {
            try {
                const titleHandle = await courseEl.$('h6');
                if (!titleHandle) {
                    console.warn('Skipping: No <h6> found in a course card');
                    continue;
                }

                const courseTitle = await titleHandle.textContent();
                const trimmedTitle = courseTitle.trim();
                console.log(`- ${trimmedTitle}`);

                if (trimmedTitle === targetCourseName) {
                    await courseEl.click();
                    console.log(`Navigated to: ${targetCourseName}`);
                    found = true;
                    break;
                }
            } catch (err) {
                console.error('Error reading course title:', err);
            }
        }

        if (!found) {
            console.warn(`Course "${targetCourseName}" not found.`);
        }

        await page.waitForLoadState('networkidle');

await page
      .getByLabel("সংক্ষিপ্ত বর্ণনা")
      .locator("div")
      .filter({ hasText: "Exam test" })
      .nth(4)
      .click();
    await page.getByRole("tab", { name: "পরীক্ষা" }).click();

    // Wait for the exams to load and ensure the exam buttons are available
    await page.waitForSelector(
      'button:has-text("HSC 2025 Mohasoptaho Higher Math")'
    );

    // Extract and print the titles of all the exams
    const examTitles = await page.$$eval("button.grid", (examElements) => {
      return examElements.map((el) => el.textContent.trim());
    });

    console.log("All Exam Titles:");
    examTitles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
    // Wait for the button to be visible
    await page.waitForSelector(
      'button:has-text("HSC 2025 Mohasoptaho Higher Math Unlimitedপরীক্ষার সময় 22 Apr, 5:25 PM থেকে 22 Apr, 10:00 PM")'
    );

    // Click on the button
    const examButton = await page.locator(
      'button:has-text("HSC 2025 Mohasoptaho Higher Math Unlimitedপরীক্ষার সময় 22 Apr, 5:25 PM থেকে 22 Apr, 10:00 PM")'
    );
    await examButton.click();
    console.log("Exam started ");







    

    // Loop through the questions and select options
    for (let i = 0; i <= 99; i++) {
      
      console.log(`Answering question ${i}...`);

      const questionLocator = page.locator(`div.question-${i}`); 
      const options = await questionLocator.locator(
        'input[type="radio"], input[type="checkbox"]'
      ); 
      await options.first().click(); 
      await page
        .getByRole("button", { name: "পরবর্তী প্রশ্ন straight" })
        .click();
      await page.waitForSelector(`div.question-${i + 1}`);
    }
    await page.getByRole("button", { name: "সাবমিট করো straight" }).click();
    await page.getByRole("button", { name: "হ্যাঁ চাই" }).click();
    console.log("Exam completed and submitted!");



    });
});
