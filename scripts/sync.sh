# Thank you @robertrossmann!
# @see https://github.com/strvcom/heimdall/blob/3107d4ca279bb17dc0ac6d83a9b9549670075233/utils/ci/sync.sh

# This script is triggered by CI after a successfull semantic-release. The purpose is to sync release commits back to master.

#!/bin/sh

set -o errexit

head=$(git rev-parse --abbrev-ref HEAD)

printf "\n=====>\tFetching new commits...\n"

# Ensure we are merging the release into current branch tips to avoid pushes being rejected
git fetch origin

printf "\n=====>\tMerging to master: %s...\n" "${head}"

git checkout master
git merge "${head}"

# Print the repo status after merging, for troubleshooting purposes
git status
git log --oneline HEAD~10..HEAD

printf "\n=====>\tPushing...\n"

git push origin master
