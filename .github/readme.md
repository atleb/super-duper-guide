# Vite to Github Pages guide
From https://vitejs.dev/guide/static-deploy.html

1. Set the correct base in vite.config.js.

If you are deploying to https://<USERNAME>.github.io/, or to a custom domain through GitHub Pages (eg. www.example.com), set base to '/'. 
Alternatively, you can remove base from the configuration, as it defaults to '/'.

If you are deploying to https://<USERNAME>.github.io/<REPO>/ 
(eg. your repository is at https://github.com/<USERNAME>/<REPO>), then set base to '/<REPO>/'.


2. Go to your GitHub Pages configuration in the repository settings page and choose the source of deployment as "GitHub Actions", this will lead you to create a workflow that builds and deploys your project, a sample workflow that installs dependencies and builds using npm is provided

- Sample added as pages.yml
- deploy on account needs public repo, or move to shared
- action should be shared common PM