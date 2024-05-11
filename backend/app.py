from datetime import datetime
from hashlib import sha256
from pathlib import Path
from random import randint

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from playwright.sync_api import sync_playwright

app = FastAPI()
pdf_location = Path(
    './backend/pdf',
)


@app.get('/certificate')
def save_certificate_file(request: Request):
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

        hash_code_pdf = sha256(p).hexdigest()
        page.pdf(path=(pdf_location / f'{hash_code_pdf}.pdf'))

    return {
        'path': request.url_for('get_certificate_file', hash_code=hash_code_pdf)._url,
        'expiration_date': datetime.now(),
        'number_certificate': randint(10000, 99999),
    }


@app.get('/certificate/file/{hash_code}')
def get_certificate_file(hash_code: str, download: bool = False):
    print(hash_code)
    pdf_file_location = pdf_location / f'{hash_code}.pdf'

    print(download)

    if download:
        return FileResponse(
            pdf_file_location,
            media_type='application/octet-stream',
            filename=pdf_file_location.name,
        )
    else:
        return FileResponse(pdf_file_location)
