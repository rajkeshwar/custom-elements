
#!/bin/sh

PREVIOUS_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  
git add . 
git commit -m "$(git rev-parse --verify master)"

if [ -z "$(git status --porcelain)" ]; then 
  # Working directory clean
  echo "Deploying gh-pages..."
  if git show-ref --verify --quiet "refs/heads/gh-pages"; then

    echo "gh-pages branch exists"

    # if git rev-parse --verify gh-pages; then 
      # echo "Deleting local gh-pages branch..."
      # git branch -D gh-pages
    # fi

    # echo "Deleting remote gh-pages branch..."
    # git push origin --delete gh-pages
  fi

  echo "Creating gh-pages branch..."
  git checkout -b gh-pages

  npm run build
  git add dist 
  git commit -m "Adding build $(git log '--format=format:%H' master -1)"

  if [[ $* == *-i* ]]; then
    echo "Modifying .gitignores...."
    ghpages-ignores
  fi

  # git push origin gh-pages
  git subtree push --prefix dist origin gh-pages
  # git push origin `git subtree split --prefix dist master`:gh-pages --force
  git checkout $PREVIOUS_BRANCH
else 
  # Uncommitted changes
  echo "Uncommitted git changes! Deploy falied"
fi


# Force push to gh-pages
# git push origin `git subtree split --prefix dist master`:gh-pages --force

# git push --set-upstream origin master