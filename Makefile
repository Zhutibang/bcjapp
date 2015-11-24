REPO_NAME=bcjapp

push_remote:
	git push origin develop

fetch_remote:
	-git pull origin master

deploy:
	@echo "=====Add git remote======="
	-git remote add sae https://git.sinaapp.com/${REPO_NAME}
	@echo "=====Add git remote OK======="
	git push sae master:1

commit_static:
	git add -A ./static
	git commit -m "Update at $(shell date)"

.PHONY: deploy update_remote
