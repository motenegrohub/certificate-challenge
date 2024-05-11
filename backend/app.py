from datetime import datetime
from hashlib import sha256
from pathlib import Path
from random import randint

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from playwright.sync_api import sync_playwright

app = FastAPI()
pdf_location = Path(
    './backend/pdf',
)


@app.get('/certificate')
def get_certificate(request: Request):
    with sync_playwright() as p:
        browser = p.chromium.launch()

        context = browser.new_context()
        page = context.new_page()

        page.goto(
            'https://robstarbuck.uk/cv',
            timeout=0,
            wait_until='domcontentloaded',
        )
        page.emulate_media(media='print')
        p = page.pdf(format='A4')
        hash_pdf = sha256(p).hexdigest()
        page.pdf(path=(pdf_location / f'{hash_pdf}.pdf'))

    return {
        'path': request.url_for('func2', hash=hash_pdf)._url,
        'expiration_date': datetime.now(),
        'number_certificate': randint(10000, 99999),
    }


@app.get('/certificate/file/{hash}')
def func2(hash: int):
    ...
