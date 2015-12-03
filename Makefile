REPO_NAME=bcjapp

push_remote:
	git push origin master

fetch_remote:
	-git pull origin master

deploy:
	@echo "=====Add git remote======="
	-git remote add sae https://git.sinaapp.com/${REPO_NAME}
	@echo "=====Add git remote OK======="
	git push sae master:1

commit_static:
	git add -A ./static
	git commit -m "Static Update at $(shell date)"

commit_bcj_api:
	git add -A ./bcj  
	git commit -m "Bcj/app update at $(shell date)"

copy_local:
	cp -r /Users/jayin/Desktop/html5slide/dist/static/app/bcj ~/dev/fenxiagnbei-project/bcjapp/static/app



.PHONY: deploy update_remote
