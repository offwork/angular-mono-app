import { Injectable } from '@nestjs/common';
import { Message } from '@sda/api-interface';

@Injectable()
export class AppService {
  public getData(): Message {
    return { message: 'Welcome to api!' };
  }

  public getLinks(): Message {
    return {
      links: [
        { href: '/home', icon: 'home', title: 'APP_LAYOUT.HOME' },
        {
          href: '/extensions',
          icon: 'extension',
          title: 'Extensions',
          children: [
            {
              href: '/extensions/document-list/presets',
              icon: 'extension',
              title: 'Document List'
            }
          ]
        },
        {
          href: '/files',
          icon: 'folder_open',
          title: 'APP_LAYOUT.CONTENT_SERVICES'
        },
        { href: '/breadcrumb', icon: 'label', title: 'APP_LAYOUT.BREADCRUMB' },
        {
          href: '/notifications',
          icon: 'alarm',
          title: 'APP_LAYOUT.NOTIFICATIONS'
        },
        {
          href: '/card-view',
          icon: 'view_headline',
          title: 'APP_LAYOUT.CARD_VIEW'
        },
        {
          href: '/confirm-dialog',
          icon: 'view_headline',
          title: 'APP_LAYOUT.CONFIRM-DIALOG'
        },
        { href: '/header-data', icon: 'edit', title: 'APP_LAYOUT.HEADER_DATA' },
        {
          href: '/node-selector',
          icon: 'attachment',
          title: 'APP_LAYOUT.NODE-SELECTOR'
        },
        {
          href: '/sites',
          icon: 'format_list_bulleted',
          title: 'APP_LAYOUT.SITES'
        },
        {
          href: '/task-list',
          icon: 'assignment',
          title: 'APP_LAYOUT.TASK_LIST'
        },
        {
          href: '/cloud',
          icon: 'cloud',
          title: 'APP_LAYOUT.PROCESS_CLOUD',
          children: [
            { href: '/cloud/', icon: 'cloud', title: 'APP_LAYOUT.HOME' },
            {
              href: '/cloud/people-group-cloud',
              icon: 'group',
              title: 'APP_LAYOUT.PEOPLE_GROUPS_CLOUD'
            }
          ]
        },
        {
          href: '/activiti',
          icon: 'device_hub',
          title: 'APP_LAYOUT.PROCESS_SERVICES',
          children: [
            { href: '/activiti', icon: 'vpn_key', title: 'APP_LAYOUT.APP' },
            {
              href: '/process-list',
              icon: 'assignment',
              title: 'APP_LAYOUT.PROCESS_LIST'
            },
            { href: '/form', icon: 'poll', title: 'APP_LAYOUT.FORM' },
            {
              href: '/form-list',
              icon: 'library_books',
              title: 'APP_LAYOUT.FORM_LIST'
            },
            {
              href: '/form-loading',
              icon: 'cached',
              title: 'APP_LAYOUT.FORM_LOADING'
            }
          ]
        },
        { href: '/login', icon: 'vpn_key', title: 'APP_LAYOUT.LOGIN' },
        { href: '/trashcan', icon: 'delete', title: 'APP_LAYOUT.TRASHCAN' },
        {
          href: '/dl-custom-sources',
          icon: 'extension',
          title: 'APP_LAYOUT.CUSTOM_SOURCES'
        },
        {
          href: '/datatable',
          icon: 'view_module',
          title: 'APP_LAYOUT.DATATABLE',
          children: [
            {
              href: '/datatable',
              icon: 'view_module',
              title: 'APP_LAYOUT.DATATABLE'
            },
            {
              href: '/datatable-lazy',
              icon: 'view_module',
              title: 'APP_LAYOUT.DATATABLE_LAZY'
            }
          ]
        },
        {
          href: '/template-list',
          icon: 'list_alt',
          title: 'APP_LAYOUT.TEMPLATE'
        },
        {
          href: '/webscript',
          icon: 'extension',
          title: 'APP_LAYOUT.WEBSCRIPT'
        },
        { href: '/tag', icon: 'local_offer', title: 'APP_LAYOUT.TAG' },
        { href: '/social', icon: 'thumb_up', title: 'APP_LAYOUT.SOCIAL' },
        {
          href: '/settings-layout',
          icon: 'settings',
          title: 'APP_LAYOUT.SETTINGS'
        },
        {
          href: '/config-editor',
          icon: 'code',
          title: 'APP_LAYOUT.CONFIG-EDITOR'
        },
        { href: '/extendedSearch', icon: 'search', title: 'APP_LAYOUT.SEARCH' },
        /* cspell:disable-next-line */
        {
          href: '/overlay-viewer',
          icon: 'pageview',
          title: 'APP_LAYOUT.OVERLAY_VIEWER'
        },
        { href: '/treeview', icon: 'nature', title: 'APP_LAYOUT.TREE_VIEW' },
        { href: '/icons', icon: 'tag_faces', title: 'APP_LAYOUT.ICONS' },
        { href: '/about', icon: 'info_outline', title: 'APP_LAYOUT.ABOUT' }
      ]
    };
  }
}
