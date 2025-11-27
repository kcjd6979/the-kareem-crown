
from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Wait for server to start
        print("Waiting for server...")
        try:
            page.goto("http://localhost:3000", timeout=60000)
            print("Server started.")
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # 1. Verify Hero Section changes
        # Check if the container box is gone (we can check by taking a screenshot of the hero area)
        print("Taking screenshot of Hero Section...")
        page.set_viewport_size({"width": 1280, "height": 800})
        # Wait a bit for animations
        time.sleep(2)

        page.screenshot(path="verification/hero_section.png", full_page=True)

        # 2. Verify Arsenal Section changes
        # Scroll to Arsenal section
        print("Scrolling to Arsenal Section...")
        # Arsenal section contains "The Arsenal" text
        arsenal_header = page.get_by_text("The Arsenal")
        if arsenal_header.is_visible():
            arsenal_header.scroll_into_view_if_needed()
            time.sleep(1)
            page.screenshot(path="verification/arsenal_section.png")
        else:
            print("Arsenal section not found!")

        browser.close()

if __name__ == "__main__":
    verify_changes()
