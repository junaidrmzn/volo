#! /bin/bash


for dir in */; do
module=${dir/\//}
    echo "Creating catalog-info.yaml in $dir"
    cat >"$dir/catalog-info.yaml" <<EOL
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: voloiq.${module}.ui
  title: ${module/-/ } UI
  tags:
  - javascript
spec:
  type: micro-frontend
  lifecycle: production
  owner: voloiq-vc-devs
  system: voloiq.${module}
  consumesApis:
  - voloiq.${module}.api
EOL

    echo "Done!"    				   # Prints when done creating and writing to the file  	    	      	      	      # in each directory. 
done 
