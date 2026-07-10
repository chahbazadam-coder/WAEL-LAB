DROP YOUR PHOTOS IN THIS FOLDER
================================

The website looks for these exact file names. Until a file exists, the site
shows a labeled blue placeholder telling you which image is missing — nothing
breaks, so you can add photos one at a time.

  hero.jpg        -> big photo in the top hero section (group/lab photo works well)
  person-pi.jpg   -> the professor / principal investigator
  person-1.jpg    -> team member 1
  person-2.jpg    -> team member 2
  person-3.jpg    -> team member 3
  project-1.jpg   -> research project 1 image
  project-2.jpg   -> research project 2 image
  project-3.jpg   -> research project 3 image

TIPS
----
- Names must match EXACTLY (all lowercase, .jpg extension).
- People photos look best square (e.g. 400x400). They're cropped to a circle.
- .png works too — just change the src in index.html from .jpg to .png.
- To add more people/projects, copy a block in index.html (each has its own id
  like id="person-3" or id="project-3") and point it at a new image name.
