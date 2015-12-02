REPO_NAME=bcjapp

push_remote:
	git push origin develop

fetch_remote:
	-git pull origin master

deploy:
	@echo "=====Add git remote======="
	-git remote add sae https://git.sinaapp.com/${REPO_NAME}
	@echo "=====Add git remote OK======="
	git push sae develop:1

merge_master:
	git merge master

commit_static:
	git add -A ./static
	git commit -m "Static Update at $(shell date)"

commit_bcj_api:
	git add -A ./bcj  
	git commit -m "Bcj/app update at $(shell date)"
	


.PHONY: deploy update_remote
