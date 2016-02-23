## What a sitemap ?
The sitemap is a file, generally in xml format, which is used to help search engines to crawl a website.
It also gives access to plenty of useful informations and allow you to detect and solve problems quickly.
Submitting sitemap to search engines is recommended as a SEO good practice.

A sitemap contains strings of html tags in the following orders:

```    
<url>
<loc>
https://wiredcraft.com/work/the-southern-sudan-referendum/
</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url>
```

`<loc></loc>` is for page location
`<changefreq></changefreq>` is the frequency at which the search engine is going to crawl again this page
`<priority></priority>` is the order in which the search engine will start crawling the website pages

## How to create a sitemap?

Go to:
[https://xmlsitemapgenerator.org/](https://xmlsitemapgenerator.org/)


Fill the website address field and the general settings fields, do no touch the other fields. Click on Generate.

You should get a sitemap looking like (in longer):

```
<!--
Created using XmlSitemapGenerator.org - Free HTML, RSS and XML sitemap generator
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://wiredcraft.com/index.html</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url>
<url>
<loc>
https://wiredcraft.com/work/the-aqueduct-global-flood-analyzer-tool/
</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url>
<url>
<loc>
https://wiredcraft.com/work/the-southern-sudan-referendum/
</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url>
<url>
<loc>
https://wiredcraft.com/blog/releasing-southern-sudan-referendum-results-drupal/
</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url>
<url>
<loc>
https://wiredcraft.com/blog/wiredcraft-building-the-southern-sudan-referendum-infrastructure/
</loc>
<changefreq>Weekly</changefreq>
<priority>0.0</priority>
</url> 
```

Well done, that's about all. 

In the next article, we'll see how to submit it to the main search engines.