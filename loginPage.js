class loginPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            loginButton: 'a[href="/auth/signin"]',
            phoneNumberInput: 'input[name="phoneNumber"]',
            passwordInput: 'input[name="password"]',
            submitButton: 'button[type="submit"]'
        };
    }

    async navigate(url) {
        console.log("Navigating to URL:", url);
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    async openLoginForm() {
        await this.page.waitForSelector(this.selectors.loginButton);
        await this.page.click(this.selectors.loginButton);
    }

    async enterInput(selector, value) {
        console.log(`Entering value into ${selector}:`, value);
        await this.page.waitForSelector(selector);
        await this.page.evaluate((sel) => {
            document.querySelector(sel).value = ''; // Clear input
        }, selector);
        await this.page.type(selector, value);
    }

    async submit(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async login(url, phoneNumber, password) {
        console.log("Starting login process...");
        await this.navigate(url);
        await this.openLoginForm();
        await this.enterInput(this.selectors.phoneNumberInput, phoneNumber);
        await this.submit(this.selectors.submitButton); // Submit phone number
        await this.enterInput(this.selectors.passwordInput, password);
        await this.submit(this.selectors.submitButton); // Submit password
        console.log("Login process completed.");
    }
}

module.exports = loginPage; // Use CommonJS export