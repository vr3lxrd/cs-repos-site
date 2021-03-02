const express = require('express')
const app = express()
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.AUTH
})

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'))
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  let apiData = await octokit.request('GET /orgs/{org}/repos', {
    org: 'ieeecsufabc'
  })
  let repos = []
  apiData.data.forEach(element  => {
    let page = element.homepage
    repos.push({
      name: element.name,
      url: element.html_url,
      principal_lang: element.language,
      page: page,
      description: element.description
    })
  })
  res.render('index', {repos: repos})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
