
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set viewport to standard desktop to ensure layout is predictable
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        # Capture console messages
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        print("Navigating to localhost:3000...")
        try:
            await page.goto("http://localhost:3000", timeout=60000, wait_until="networkidle")
        except Exception as e:
            print(f"Navigation failed (timeout or other): {e}")
            # Continue anyway as we might have loaded enough

        # Wait a bit for animations and hydration
        await asyncio.sleep(5)

        # Verify Hero Section
        print("Verifying Hero Section...")
        await page.screenshot(path="verification/hero_section_v2.png")
        print("Hero section screenshot taken.")

        # Verify Connect Section
        print("Scrolling to Connect Section...")

        # Scroll to the bottom or specifically to the icons
        try:
            linkedin_icon = page.locator("a[aria-label='LinkedIn']")
            await linkedin_icon.scroll_into_view_if_needed()
            print("Scrolled to LinkedIn icon.")
        except Exception as e:
            print(f"Could not scroll to LinkedIn icon: {e}")

        await asyncio.sleep(2) # Wait for scroll/animation
        await page.screenshot(path="verification/connect_section_v2.png")
        print("Connect section screenshot taken.")

        # Verify social icons existence
        socials = [
            "LinkedIn", "YouTube", "Instagram", "TikTok", "X",
            "Facebook", "Threads", "Substack", "Google"
        ]

        for social in socials:
            if await page.get_by_label(social).count() > 0:
                print(f"Icon for {social} found.")
            else:
                print(f"ERROR: Icon for {social} NOT found.")

        # Verify interaction (Click test)
        print("Verifying interaction (Click test)...")
        try:
            # We try to click. If covered by spotlight without pointer-events-none, this will timeout/fail
            # force=False ensures it checks for actionability
            await page.click("a[aria-label='LinkedIn']", timeout=5000)
            print("SUCCESS: LinkedIn icon is clickable.")
        except Exception as e:
            print(f"FAILURE: LinkedIn icon is NOT clickable. Likely blocked by an overlay. Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
