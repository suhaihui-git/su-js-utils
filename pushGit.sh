#!/bin/bash

# 获取当前版本号
version=$(node -p "require('./package.json').version")

# 获取提交信息（如果没有提供，则使用版本号）
commit_message=${1:-"v$version"}

# 添加所有更改
git add .

# 提交更改
git commit -m "$commit_message"



# 推送到远程仓库
git push origin main --force

echo "Successfully pushed version v$version to git with message: $commit_message" 