#!/bin/bash

# 确保脚本在出错时停止执行
set -e

# 获取当前版本号
current_version=$(node -p "require('./package.json').version")
echo "当前版本: $current_version"

echo "切换到 node 20.17.0"
nvm use 20.17.0

echo "设置 npm 镜像源为 npmjs"
npm config set registry https://registry.npmjs.org/

# 构建项目
echo "开始构建..."
npm run build

# 检查并处理 git 状态
echo "检查 git 状态..."
if [ -n "$(git status --porcelain)" ]; then
    echo "发现未提交的更改，正在自动提交..."
    git add .
    git commit -m "chore: pre-publish commit [skip ci]"
fi

# 更新版本号
echo "更新版本号..."
new_version=$(npm version $version_type -m "chore: release %s [skip ci]" --force)
echo "版本已更新至: $new_version"

# 推送到远程仓库
echo "推送到远程仓库..."
git push --follow-tags

# 发布到 npm
echo "开始发布到 npm..."
npm publish

echo "✨ 发布成功！" 

echo "切换到 node 14.17.1"
nvm use 14.17.1

echo "切换到淘宝镜像源"
npm config set registry https://registry.npmmirror.com/
echo "切换成功"