// Compute basePath/assetPrefix automatically for GitHub Pages project sites
const isGhActions = process.env.GITHUB_ACTIONS === 'true'
const ghRepo = process.env.GITHUB_REPOSITORY || '' // e.g. "owner/repo"
const [ghOwner, ghName] = ghRepo.split('/')
const isUserSite = ghOwner && ghName === `${ghOwner}.github.io`

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export for GitHub Pages
  output: 'export',
  // Use subpath when deploying to project pages (not username.github.io)
  basePath: isGhActions && ghName && !isUserSite ? `/${ghName}` : undefined,
  assetPrefix: isGhActions && ghName && !isUserSite ? `/${ghName}/` : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
