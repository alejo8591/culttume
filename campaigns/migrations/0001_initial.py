# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Campaign'
        db.create_table(u'campaigns_campaign', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_campaign', self.gf('django.db.models.fields.CharField')(max_length=128, null=True)),
            ('ubication', self.gf('django.db.models.fields.CharField')(max_length=128, null=True)),
            ('datetime_campaign_start', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
            ('datetime_campaign_end', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
            ('datetime_campaign_create', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
            ('datetime_campaign_update', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
            ('logo_image_file_campaign', self.gf('django.db.models.fields.files.ImageField')(max_length=100, null=True, blank=True)),
            ('logo_image_url_campaign', self.gf('django.db.models.fields.URLField')(max_length=200, null=True, blank=True)),
            ('description_campaign', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('owner_campaign', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['account.UserProfile'])),
            ('name_event_organizer', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_event_organizer', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('social_network_campaign', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['campaigns.SocialNetwork'])),
        ))
        db.send_create_signal(u'campaigns', ['Campaign'])

        # Adding model 'SocialNetwork'
        db.create_table(u'campaigns_socialnetwork', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_social_network', self.gf('django.db.models.fields.CharField')(max_length=128, null=True)),
            ('url_social_network', self.gf('django.db.models.fields.URLField')(max_length=200, null=True, blank=True)),
            ('datetime_social_network_create', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
            ('datetime_social_network_update', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, null=True, blank=True)),
        ))
        db.send_create_signal(u'campaigns', ['SocialNetwork'])


    def backwards(self, orm):
        # Deleting model 'Campaign'
        db.delete_table(u'campaigns_campaign')

        # Deleting model 'SocialNetwork'
        db.delete_table(u'campaigns_socialnetwork')


    models = {
        u'account.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'about_user': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'behance_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dob_user': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'fb_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'flickr_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'gender': ('django.db.models.fields.CharField', [], {'max_length': '4', 'null': 'True', 'blank': 'True'}),
            'linkedin_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slug_field': ('django.db.models.fields.SlugField', [], {'max_length': '64', 'null': 'True'}),
            'soundcloud_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'twitter_user': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'related_name': "'Perfil'", 'unique': 'True', 'primary_key': 'True', 'to': u"orm['auth.User']"})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'campaigns.campaign': {
            'Meta': {'object_name': 'Campaign'},
            'datetime_campaign_create': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            'datetime_campaign_end': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            'datetime_campaign_start': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            'datetime_campaign_update': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            'description_campaign': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_event_organizer': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'logo_image_file_campaign': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'logo_image_url_campaign': ('django.db.models.fields.URLField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'name_campaign': ('django.db.models.fields.CharField', [], {'max_length': '128', 'null': 'True'}),
            'name_event_organizer': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'owner_campaign': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['account.UserProfile']"}),
            'social_network_campaign': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['campaigns.SocialNetwork']"}),
            'ubication': ('django.db.models.fields.CharField', [], {'max_length': '128', 'null': 'True'})
        },
        u'campaigns.socialnetwork': {
            'Meta': {'object_name': 'SocialNetwork'},
            'datetime_social_network_create': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            'datetime_social_network_update': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_social_network': ('django.db.models.fields.CharField', [], {'max_length': '128', 'null': 'True'}),
            'url_social_network': ('django.db.models.fields.URLField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['campaigns']