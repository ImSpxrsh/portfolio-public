# Resume source

`resume.html` is the source of truth for `public/Sparsh_Roy_Resume.pdf`.
Edit the HTML, then regenerate the PDF:

```bash
npm run resume
```

That prints the HTML to PDF with headless Chrome at Letter size. Check the
result before committing — content changes can push it onto an extra page.
