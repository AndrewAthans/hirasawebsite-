# Troubleshooting GitHub Pages

## Check These Things:

### 1. Repository Visibility
- Go to: https://github.com/AndrewAthans/hirasafoundation/settings
- Scroll to "Danger Zone"
- Make sure repository is **Public** (required for free GitHub Pages)

### 2. GitHub Pages Settings
- Go to: https://github.com/AndrewAthans/hirasafoundation/settings/pages
- **Source** should be set to: **GitHub Actions**
- If it says "None" or a branch name, change it to "GitHub Actions"

### 3. Check Actions Workflow
- Go to: https://github.com/AndrewAthans/hirasafoundation/actions
- Look for "Deploy to GitHub Pages" workflow
- Click on it to see if it's running or has errors
- If there are errors, click on the failed job to see details

### 4. Correct Website URL
Your website should be at:
- **https://andrewathans.github.io/hirasafoundation/**

Note: It might take 2-5 minutes after enabling Pages for the first time.

### 5. If Still Not Working
Try accessing:
- https://andrewathans.github.io/hirasafoundation/index.html

### 6. Common Issues
- **404 Error**: GitHub Pages not enabled or workflow failed
- **Blank Page**: CSS/JS paths might be wrong (check browser console)
- **Repository not found**: Repository might be private

### 7. Manual Workflow Trigger
If the workflow didn't run automatically:
1. Go to Actions tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select "main" branch
5. Click "Run workflow"


