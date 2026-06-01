import type { Schema, Struct } from '@strapi/strapi';

export interface PageModelCard extends Struct.ComponentSchema {
  collectionName: 'components_page_model_cards';
  info: {
    description: 'Product model card with specs and media';
    displayName: 'Model Card';
    icon: 'server';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    specs: Schema.Attribute.JSON;
    tag: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos' | 'files'>;
  };
}

export interface PageSpecCategory extends Struct.ComponentSchema {
  collectionName: 'components_page_spec_categories';
  info: {
    displayName: 'Spec Category';
    icon: 'table';
  };
  attributes: {
    name: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'page.spec-row', true>;
  };
}

export interface PageSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_page_spec_rows';
  info: {
    displayName: 'Spec Row';
    icon: 'layer';
  };
  attributes: {
    col1: Schema.Attribute.String;
    col2: Schema.Attribute.String;
    col3: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page.model-card': PageModelCard;
      'page.spec-category': PageSpecCategory;
      'page.spec-row': PageSpecRow;
    }
  }
}
