from rest_framework import serializers
from api.models import User, Class, Assignment, AssignmentSubmission, AssignmentGroup, AssignmentSubmissionComment, AssignmentSubmissionFile

#
# User
#

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email')

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email')

#
# Class info
#

class ClassSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ('id', 'code', 'name', 'term')

#
# Assignment info
#

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'course', 'name', 'description', 'release_date', 'submission_deadline', 'commenting_deadline')

class AssignmentGroupSerializer(serializers.ModelSerializer):
    users = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = AssignmentGroup
        fields = ('id', 'assignment', 'users')

#
# Submission info
#

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmissionComment
        fields = ('id', 'submission', 'submission_file', 'line_number', 'user', 'comment')


class SubmissionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = AssignmentSubmission
        fields = ('id', 'assignment', 'user', 'submitted_at', 'is_current', 'submitter_has_reviewed_comments', 'comments')

class SubmissionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmissionFile
        fields = ('id', 'name', 'submission', 'content')

class CurrentSubmissionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    files = SubmissionFileSerializer(many=True, read_only=True)

    class Meta:
        model = AssignmentSubmission
        fields = ('id', 'assignment', 'user', 'submitted_at', 'is_current', 'submitter_has_reviewed_comments', 'comments', 'files')
