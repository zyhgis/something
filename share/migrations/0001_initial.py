# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Accident',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.DateTimeField()),
                ('atype', models.CharField(max_length=50)),
                ('death', models.CharField(max_length=50)),
                ('injury', models.CharField(max_length=50)),
                ('loss', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('weather', models.CharField(max_length=50)),
                ('rain', models.CharField(max_length=50)),
                ('temperature', models.CharField(max_length=50)),
                ('windy', models.CharField(max_length=50)),
                ('humidity', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('time', models.CharField(max_length=50)),
                ('longitude', models.CharField(max_length=50)),
                ('latitude', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
                ('approvepro', models.CharField(max_length=50)),
                ('actualpro', models.CharField(max_length=50)),
                ('gaslevel', models.CharField(max_length=50)),
                ('certificate', models.CharField(max_length=50)),
                ('explorationmap', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('factory', models.CharField(max_length=50)),
                ('time', models.CharField(max_length=50)),
                ('companyname', models.ForeignKey(to='share.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Government',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('userid', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('governname', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('konggutype', models.CharField(max_length=50)),
                ('time', models.CharField(max_length=50)),
                ('registratetype', models.CharField(max_length=50)),
                ('safetype', models.CharField(max_length=50)),
                ('size', models.CharField(max_length=50)),
                ('gtype', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='GroupUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('userid', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('groupname', models.ForeignKey(to='share.Group')),
            ],
        ),
        migrations.CreateModel(
            name='Policy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('time', models.DateField(max_length=50)),
                ('department', models.CharField(max_length=50)),
                ('context', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='TimeIndex',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gasdensity', models.CharField(max_length=50)),
                ('dustdensity', models.CharField(max_length=30)),
                ('workersum', models.CharField(max_length=10)),
                ('illuminance', models.CharField(max_length=20)),
                ('noise', models.CharField(max_length=20)),
                ('temperture', models.CharField(max_length=20)),
                ('wind', models.CharField(max_length=20)),
                ('companyname', models.ForeignKey(to='share.Company')),
            ],
        ),
        migrations.CreateModel(
            name='UserOr',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('userid', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='WholeCondition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('year', models.CharField(max_length=4)),
                ('accidentsum', models.CharField(max_length=10)),
                ('deaths', models.CharField(max_length=10)),
                ('production', models.CharField(max_length=10)),
                ('drmt', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Workers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('sex', models.CharField(max_length=4)),
                ('post', models.CharField(max_length=10)),
                ('education', models.CharField(max_length=10)),
                ('age', models.CharField(max_length=10)),
                ('experience', models.CharField(max_length=10)),
                ('major', models.CharField(max_length=10)),
                ('companyname', models.ForeignKey(to='share.Company')),
            ],
        ),
        migrations.CreateModel(
            name='WorkerTime',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('weekworktime', models.CharField(max_length=50)),
                ('bodycondition', models.CharField(max_length=50)),
                ('injurycondition', models.CharField(max_length=50)),
                ('bodyinjury', models.CharField(max_length=50)),
                ('companyname', models.ForeignKey(to='share.Company')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='groupname',
            field=models.ForeignKey(to='share.Group'),
        ),
        migrations.AddField(
            model_name='accident',
            name='name',
            field=models.ForeignKey(to='share.Company'),
        ),
    ]
