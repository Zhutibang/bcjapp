REPO_NAME=bcjapp

update_remote:
	-git pull origin master

deploy:
	@echo "=====Add git remote======="
	-git remote add sae https://git.sinaapp.com/${REPO_NAME}
	@echo "=====Add git remote OK======="
	git push sae master:1

.PHONY: deploy update_remote
