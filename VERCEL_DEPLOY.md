# Quick Vercel Deployment Guide

## Deploy Frontend to Vercel

### Step 1: Push to GitHub

```powershell
# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Cleaned up project for deployment"

# Push to GitHub
git push origin main
```

### Step 2: Deploy Frontend on Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)

2. **Sign in**: Click "Sign Up" or "Login" → Choose "Continue with GitHub"

3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Build Settings**:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL`
   - Value: `http://localhost:3000` (temporary - update after backend deployment)

6. **Deploy**: Click "Deploy"

7. **Wait**: Vercel will build and deploy (takes 2-3 minutes)

8. **Get URL**: Copy your deployment URL (e.g., `https://your-app.vercel.app`)

---

## Deploy Backend to Railway

Since Vercel is primarily for frontends, deploy your backend to Railway:

### Step 1: Deploy Backend on Railway

1. **Go to Railway**: Visit [railway.app](https://railway.app)

2. **Sign in**: Click "Login" → "Login with GitHub"

3. **Create Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will detect it's a Node.js project

4. **Configure**:
   - Root directory: Leave empty (uses project root)
   - Start command: `npm start`

5. **Add Environment Variables**:
   Click "Variables" and add:
   ```
   PORT=$PORT
   NODE_ENV=production
   JWT_SECRET=your_secure_random_string_here
   WHO_ICD_CLIENT_ID=your_client_id_here
   WHO_ICD_CLIENT_SECRET=your_client_secret_here
   WHO_ICD_BASE_URL=https://id.who.int/icd/release/11/2023-01
   ```

6. **Deploy**: Railway will automatically deploy

7. **Get Backend URL**: 
   - Click "Settings" → "Generate Domain"
   - Copy the URL (e.g., `https://your-backend.railway.app`)

### Step 2: Update Frontend Environment Variable

1. Go back to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Update `REACT_APP_API_URL` to your Railway backend URL
5. Redeploy: "Deployments" → Click "..." → "Redeploy"

---

## Alternative: Deploy Both on Vercel

If you want everything on Vercel, you can deploy the frontend on Vercel and use a serverless backend, but this requires code changes. **Railway is easier for your current setup.**

---

## Verify Deployment

### Test Backend:
```
https://your-backend.railway.app/health
https://your-backend.railway.app/api/terminology/search?q=fever
```

### Test Frontend:
Visit your Vercel URL and verify:
- Page loads correctly
- API calls work (check browser console)

---

## Troubleshooting

**Frontend can't connect to backend?**
- Check `REACT_APP_API_URL` is set correctly
- Verify backend CORS allows your Vercel domain
- Check backend is running on Railway

**Backend won't start?**
- Verify all environment variables are set
- Check Railway logs for errors
- Ensure `PORT=$PORT` is set

**Build fails?**
- Check build logs in Vercel/Railway
- Verify `package.json` scripts are correct
- Try deploying from a clean commit

---

## Quick Commands

```powershell
# Commit and push changes
git add .
git commit -m "Ready for deployment"
git push origin main

# Check if backend starts locally
npm start

# Check if frontend builds locally
cd frontend
npm run build
```

---

## Summary

1. ✅ Push code to GitHub
2. ✅ Deploy frontend to Vercel (3 minutes)
3. ✅ Deploy backend to Railway (3 minutes)
4. ✅ Update frontend env variable with backend URL
5. ✅ Test both deployments

**Total time: ~10 minutes**
**Total cost: $0/month** (using free tiers)
