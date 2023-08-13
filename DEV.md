```sh
docker run -itd --rm -p 8090:80 --name nginx -v ${PWD}\docs:/usr/share/nginx/html:ro -d nginx
```