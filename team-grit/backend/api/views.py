# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import HttpResponseNotFound
from django.http import QueryDict
from .serializers import StudentSerializer, ProfessorSerializer, ClassSerialzer
from .serializers import AssignmentSerializer, AssignmentGroupSerializer
from .serializers import SubmissionSerializer, CurrentSubmissionSerializer, CommentSerializer, SubmissionFileSerializer
from .models import User, Class, Assignment, AssignmentGroup, AssignmentSubmission, AssignmentSubmissionComment, AssignmentSubmissionFile
from django.shortcuts import redirect

# Create your views here.

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = User.objects.filter(is_teacher=False)

    def list(self, request):
        class_id = request.GET.get('class', None)
        if class_id is None:
            # list all students: api/students
            serializer = StudentSerializer(self.queryset, many=True)
            return Response(serializer.data)
        else:
            # list students for given class: api/students/?class=<id>
            queryset = Class.objects.get(id=class_id).students.all()
            serializer = StudentSerializer(queryset, many=True)
            return Response(serializer.data)

class ProfessorView(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = User.objects.filter(is_teacher=True)

class ClassView(viewsets.ModelViewSet):
    serializer_class = ClassSerialzer
    queryset = Class.objects.all()

    # @action(detail=True)
    # def create(self, request, pk=None):
    #     queryset = Class.objects.filter(name=pk)
    #     serializer = ClassSerialzer(queryset, many=True)
    #     return Response(serializer.data)

    def list(self, request):
        teacher = request.GET.get('teacher', None)
        student = request.GET.get('student', None)
        if (teacher is None and student is None):
            # list all classes: api/classes
            serializer = ClassSerialzer(self.queryset, many=True)
            return Response(serializer.data)
        elif student is None:
            # list classes for given teacher: api/classes/?teacher=<id>
            queryset = self.queryset.filter(teacher__id=teacher)
            serializer = ClassSerialzer(queryset, many=True)
            return Response(serializer.data)
        elif teacher is None:
            # list classes for given student: api/classes/?student=<id>
            queryset = self.queryset.filter(students__id=student)
            serializer = ClassSerialzer(queryset, many=True)
            return Response(serializer.data)
        else:
            HttpResponseNotFound(f"Class(es) not found")

    @action(detail=True)
    def assignments(self, request, pk=None):
        # list assignments for given class: api/classes/<id>/assignments
        queryset = Assignment.objects.filter(course__id=pk)
        serializer = AssignmentSerializer(queryset, many=True)
        return Response(serializer.data)

class AssignmentView(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    @action(detail=True)
    def groups(self, request, pk=None):
        # list groups for given assignment: api/assignments/<id>/groups
        queryset = AssignmentGroup.objects.filter(assignment__id=pk)
        serializer = AssignmentGroupSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def submissions(self, request, pk=None):
        # list submissions for given assignment: api/assignments/<id>/submissions
        student = request.GET.get('student', None)
        current = True if request.GET.get('current', "").lower() in ('true', 'yes') else False
        if student is None:
            # list all submissions for assignment: api/assignments/<id>/submissions
            queryset = AssignmentSubmission.objects.filter(assignment__id=pk)
            serializer = SubmissionSerializer(queryset, many=True)
            return Response(serializer.data)
        elif not current:
            # list assignment submissions for given student: api/assignments/<id>/submissions/?student=<id>
            queryset = AssignmentSubmission.objects.filter(assignment__id=pk, user__id=student)
            serializer = SubmissionSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            # show current assignment submission for given student: api/assignments/<id>/submissions/?student=<id>&current=true
            queryset = AssignmentSubmission.objects.filter(assignment__id=pk, user__id=student, is_current=True)
            serializer = CurrentSubmissionSerializer(queryset, many=True)
            return Response(serializer.data)

class SubmissionView(viewsets.ModelViewSet):
    serializer_class = CurrentSubmissionSerializer
    queryset = AssignmentSubmission.objects.all()

class CommentsView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = AssignmentSubmissionComment.objects.all()

class SubmissionFileView(viewsets.ModelViewSet):
    serializer_class = SubmissionFileSerializer
    queryset = AssignmentSubmissionFile.objects.all()






