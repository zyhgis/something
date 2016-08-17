from django.contrib import admin
from .models import Accident
from .models import Company
from .models import Group
from .models import UserOr
from .models import GroupUser
from .models import Government
from .models import Workers
from .models import Equipment
from .models import TimeIndex
from .models import WholeCondition
from .models import Policy
# Register your models here.
admin.site.register(Accident)
admin.site.register(Company)
admin.site.register(Group)
admin.site.register(UserOr)
admin.site.register(GroupUser)
admin.site.register(Government)
admin.site.register(Workers)
admin.site.register(Equipment)
admin.site.register(TimeIndex)
admin.site.register(WholeCondition)
admin.site.register(Policy)