from django.contrib import admin
from .models import User, Class, Assignment, AssignmentGroup, AssignmentSubmission, AssignmentSubmissionComment, AssignmentSubmissionFile
from django import forms
from django.db import models


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'is_teacher')

class ClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'name', 'term')

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'course', 'name')

class AssignmentGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'assignment')

class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'assignment', 'user')

class AsTextFileInput(forms.widgets.FileInput):
    def value_from_datadict(self, data, files, name):
        return files.get(name).read()

class AssignmentSubmissionFileAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AsTextFileInput()}
    }

class AssignmentSubmissionCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'submission', 'user', 'comment')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Class, ClassAdmin)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(AssignmentGroup, AssignmentGroupAdmin)
admin.site.register(AssignmentSubmission, AssignmentSubmissionAdmin)
admin.site.register(AssignmentSubmissionFile, AssignmentSubmissionFileAdmin)
admin.site.register(AssignmentSubmissionComment, AssignmentSubmissionCommentAdmin)
