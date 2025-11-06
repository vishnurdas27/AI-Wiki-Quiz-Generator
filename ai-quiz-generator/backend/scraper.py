import re
import requests
from bs4 import BeautifulSoup
from typing import Tuple

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                   "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

WIKI_MAIN_SELECTOR = "#mw-content-text"

def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\[\d+\]", "", text)
    return text.strip()

def scrape_wikipedia(url: str) -> Tuple[str,str,str]:
    if not url.startswith("http"):
        raise ValueError("Invalid URL")
    
    resp = requests.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()

    soup=BeautifulSoup(resp.text, "html.parser")

    title_tag=soup.find(id="firstHeading")
    title= title_tag.get_text(strip=True) if title_tag else "Untitled"

    summary_parts=[]
    for p in soup.select("#mw-content-text .mw-parser-output > p"):
        if p.find_parent(class_="infobox"):
            continue 
        txt = p.get_text(" ", strip=True)
        if txt:
            summary_parts.append(txt)
        if len(summary_parts) >= 2:
            break
    summary=clean_text(" ".join(summary_parts))

    for sel in ["table", "sup", "span.mw-editsection", "style", "script", "figute", ".toc"]:
        for tag in soup.select(sel):
            tag.decompose()
    
    content_div = soup.select_one(WIKI_MAIN_SELECTOR)
    body_text = clean_text(content_div.get_text(" ", strip=True)) if content_div else ""

    return title, summary, body_text
