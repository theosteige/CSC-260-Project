from django.test import TestCase
from django.utils import timezone
from .models import User, Class


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
