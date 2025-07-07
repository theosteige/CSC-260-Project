from django.test import TestCase
from django.utils import timezone
from .models import User, Class, Assignment, AssignmentSubmission


class StudentListTests(TestCase):
    """Tests for the StudentView list endpoint."""

    def setUp(self):
        self.teacher = User.objects.create(name="Teacher", email="teach@example.com", is_teacher=True)
        self.student1 = User.objects.create(name="Alice", email="alice@example.com")
        self.student2 = User.objects.create(name="Bob", email="bob@example.com")
        now = timezone.now()
        self.class1 = Class.objects.create(
            code="C1",
            name="Class1",
            term="Fall",
            start_date=now,
            end_date=now,
            teacher=self.teacher,
        )
        self.class1.students.add(self.student1)

    def test_list_all_students(self):
        response = self.client.get("/api/students/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_filter_students_by_class(self):
        url = f"/api/students/?class={self.class1.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        ids = [s["id"] for s in data]
        self.assertEqual(ids, [self.student1.id])


class ClassListTests(TestCase):
    def setUp(self):
        self.teacher = User.objects.create(name="Professor", email="prof@example.com", is_teacher=True)
        now = timezone.now()
        self.class1 = Class.objects.create(
            code="CS101",
            name="Intro",
            term="Fall",
            start_date=now,
            end_date=now,
            teacher=self.teacher,
        )
        self.class2 = Class.objects.create(
            code="CS102",
            name="Advanced",
            term="Fall",
            start_date=now,
            end_date=now,
            teacher=self.teacher,
        )

    def test_get_classes_returns_expected_data(self):
        response = self.client.get("/api/classes/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        codes = sorted([c["code"] for c in data])
        self.assertEqual(codes, sorted([self.class1.code, self.class2.code]))
        class1_resp = next((c for c in data if c["id"] == self.class1.id), None)
        self.assertIsNotNone(class1_resp)
        self.assertEqual(class1_resp["teacher"], self.teacher.id)
        self.assertEqual(class1_resp["students"], [])


class AssignmentTests(TestCase):
    """Verify assignment listing endpoints."""

    def setUp(self):
        self.teacher = User.objects.create(name="Prof", email="prof2@example.com", is_teacher=True)
        now = timezone.now()
        self.cls = Class.objects.create(code="CS200", name="DS", term="Fall", start_date=now, end_date=now, teacher=self.teacher)
        self.assignment = Assignment.objects.create(
            course=self.cls,
            name="HW1",
            description="Test hw",
            release_date=now,
            submission_deadline=now,
            commenting_deadline=now,
        )

    def test_assignments_for_class(self):
        url = f"/api/classes/{self.cls.id}/assignments/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], self.assignment.name)


class SubmissionTests(TestCase):
    """Tests for AssignmentSubmission related endpoints."""

    def setUp(self):
        self.student = User.objects.create(name="Student", email="stud@example.com")
        self.teacher = User.objects.create(name="Prof", email="prof3@example.com", is_teacher=True)
        now = timezone.now()
        self.cls = Class.objects.create(code="CS300", name="AI", term="Spring", start_date=now, end_date=now, teacher=self.teacher)
        self.assignment = Assignment.objects.create(
            course=self.cls,
            name="Project",
            description="desc",
            release_date=now,
            submission_deadline=now,
            commenting_deadline=now,
        )
        self.sub1 = AssignmentSubmission.objects.create(
            assignment=self.assignment,
            user=self.student,
            submitted_at=now,
            is_current=True,
        )

    def test_current_submission_endpoint(self):
        url = f"/api/assignments/{self.assignment.id}/submissions/?student={self.student.id}&current=true"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["id"], self.sub1.id)
