#!/bin/bash

# Setup script for Supabase API proxy fix
# Run this to prepare your project for deployment

echo "🚀 CoBuild Supabase API Proxy Setup"
echo "===================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
  echo "⚠️  Creating .env file from .env.example..."
  cp .env.example .env
  echo "✅ .env file created. Please update with your credentials."
else
  echo "✅ .env file already exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your Supabase credentials"
echo "2. Run 'npm run dev' to test locally"
echo "3. Push to GitHub and redeploy on Vercel"
echo ""
echo "📖 See SUPABASE_FIX.md for detailed instructions"
