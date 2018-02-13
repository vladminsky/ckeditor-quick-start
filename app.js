import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Image from '@ckeditor/ckeditor5-image/src/image';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';

class InsertImage extends Plugin {
    init() {
        console.log('Insert image plugin init');
        const editor = this.editor;

        editor.ui.componentFactory.add('insertImage', locale => {
            const btn = new ButtonView(locale);

            btn.set({
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            btn.on('execute', () => {
                const imageURL = prompt('Image URL');
                console.log(imageURL);
                editor.document.enqueueChanges(() => {
                    const imageElement = new ModelElement('image', {
                        src: imageURL
                    });

                    // Insert the image in the current selection location.
                    editor.data.insertContent(imageElement, editor.document.selection);
                });
            });

            return btn;
        });
    }
}


ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Essentials, Paragraph, Bold, Italic, Image, InsertImage, ImageCaption],
        toolbar: ['bold', 'italic', 'insertImage']
    })
    .then(editor => {
        console.log('Editor was initialized', editor);
    })
    .catch(error => {
        console.error(error.stack);
    });