# Enable GitHub Pages - Quick Steps

## Step 1: Enable GitHub Pages

1. Go to: https://github.com/AndrewAthans/hirasafoundation
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Click **Save**

## Step 2: Check Deployment Status

1. Go to the **Actions** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages"
3. Click on it to see if it's running or completed
4. If it shows a green checkmark, the deployment succeeded

## Step 3: Find Your Website URL

After the workflow completes (1-2 minutes), your website will be at:

**https://andrewathans.github.io/hirasafoundation/**

OR check the workflow output - it will show the exact URL.

## If It's Still Not Working

- Make sure the repository is **Public** (required for free GitHub Pages)
- Wait 2-3 minutes after enabling Pages for the first deployment
- Check the Actions tab for any error messages
- The URL format is: `https://USERNAME.github.io/REPOSITORY-NAME/`


