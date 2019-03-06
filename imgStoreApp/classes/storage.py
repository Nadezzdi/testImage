import os


class Rect:
    """store rect as it was added to img"""


    def __init__(self, x, y, width, height, color = "green"):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color


class Image:


    """store image and it changes"""
    def __init__(self, path, id):
        self.source_path = path
        self.id = id


class Base():
    def __init__(self, dir, id):
        self.folder = dir
        self.id =id


class BaseStorage():
    def __init__(self):
        self.list_of_base= []
        self.images_by_base={}
        self.image_store=[]
        self.rect_by_image={}
        self.media_dir = os.path.join(os.getcwd(), 'media')

    def fill_storage(self):
        print( 'fill storage')
        if (os.path.isdir(self.media_dir)):
            for dir in os.listdir(self.media_dir):
                find_folder = os.path.join(self.media_dir, dir)
                if (os.path.isdir(find_folder)):
                    new_base = Base(dir, len(self.list_of_base))
                    self.list_of_base.append(new_base)
                    self.images_by_base[new_base.id] = []
                    for file in os.listdir(find_folder):
                        if file.endswith(('jpg', 'jpeg', 'png')):
                            new_image = Image(file, len(self.image_store))
                            #add new image into image store list
                            self.image_store.append(new_image)
                            self.rect_by_image[new_image.id] = []
                            '''for tests fill rects array'''
                            self.rect_by_image[new_image.id].append(Rect(100, 100, 200, 300, "red"))
                            self.rect_by_image[new_image.id].append(Rect(290, 350, 300, 200, "blue"))
                            self.rect_by_image[new_image.id].append(Rect(50, 50, 100, 400, "yellow"))
                            ''''''
                            #add image id into dict connected base and its images
                            self.images_by_base[new_base.id].append(new_image.id)

    def get_base_list(self):
        return self.list_of_base

    def get_base_images(self, id):
        if ((id < 0) or (id >= len(self.list_of_base))):
            return []
        else:
            return list(self.image_store[image_id] for image_id in self.images_by_base[id])

    def get_image_details(self, id):
        if ((id < 0) or (id >= len(self.image_store))):
            return []
        else:
            image = self.image_store[id]
            return {"id": image.id, "source_path": image.source_path, "rects": self.rect_by_image.get(id, [])}

    def put_rects(self, id, data):
        #TODO: validate data, exceptions now
        if ((id < 0) or (id >= len(self.image_store))):
            return []
        else:
            new_image_rects = []
            for rect in data["rects"]:
                new_image_rects.append(Rect(rect['x'], rect['y'], rect['width'], rect['height'], rect.get('color', 'black')))
            self.rect_by_image[id] = new_image_rects
            return self.get_image_details(id)
