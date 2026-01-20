import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()
        try:
            print("Navigating to http://localhost:3005...")
            await page.goto("http://localhost:3005", wait_until="domcontentloaded", timeout=60000)
            await asyncio.sleep(5)
            # animations might be running, try to capture anyway
            await page.screenshot(path="site_screenshot.png", timeout=60000)
            print("Screenshot saved to site_screenshot.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

asyncio.run(main())
