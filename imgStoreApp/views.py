from django.http import HttpResponse
import ujson
from .classes.storage import BaseStorage

storage = BaseStorage()
storage.fill_storage()

def base_list(request):
    return HttpResponse(ujson.dumps(storage.get_base_list()), status='200')

def base(request, id):
    response_object = storage.get_base_images(id)
    if (len(response_object) == 0):
        return HttpResponse("No base found", status='404')
    else:
        return HttpResponse(ujson.dumps(response_object), status='200')

def image(request, id):
    if request.method == "POST":
        try:
            data = ujson.loads(request.body)
            response_object = storage.put_rects(id, data)
            if (len(response_object)==0):
                return HttpResponse("No image found", status='404')
            else:
                return HttpResponse(ujson.dumps(response_object), status='200')
        except (ValueError, KeyError) as e:
            return HttpResponse("Bad request", status='400')
    if request.method == "GET":
        response_object = storage.get_image_details(id)
        if (len(response_object)==0):
            return HttpResponse("No image found", status='404')
        else:
            return HttpResponse(ujson.dumps(response_object), status='200')
