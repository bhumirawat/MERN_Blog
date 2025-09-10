// /**
//  * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
//  * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdA7DKFIEY4BYoE50FYUgjroo4AMZpUAzFFGrjVtVnFliB1gBy6PIQApgDtkZMMBRgpMsOJQBdVNxABjVSgBmEBUA==
//  */

// import { useState, useEffect, useRef, useMemo } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import {
// 	ClassicEditor,
// 	Alignment,
// 	Autoformat,
// 	AutoImage,
// 	AutoLink,
// 	Autosave,
// 	BalloonToolbar,
// 	BlockQuote,
// 	BlockToolbar,
// 	Bold,
// 	Bookmark,
// 	CloudServices,
// 	Code,
// 	CodeBlock,
// 	Emoji,
// 	Essentials,
// 	FindAndReplace,
// 	FontBackgroundColor,
// 	FontColor,
// 	FontFamily,
// 	FontSize,
// 	FullPage,
// 	Fullscreen,
// 	GeneralHtmlSupport,
// 	Heading,
// 	Highlight,
// 	HorizontalLine,
// 	HtmlComment,
// 	HtmlEmbed,
// 	ImageBlock,
// 	ImageCaption,
// 	ImageInline,
// 	ImageInsert,
// 	ImageInsertViaUrl,
// 	ImageResize,
// 	ImageStyle,
// 	ImageTextAlternative,
// 	ImageToolbar,
// 	ImageUpload,
// 	Indent,
// 	IndentBlock,
// 	Italic,
// 	Link,
// 	LinkImage,
// 	List,
// 	ListProperties,
// 	Mention,
// 	PageBreak,
// 	Paragraph,
// 	RemoveFormat,
// 	ShowBlocks,
// 	SimpleUploadAdapter,
// 	SourceEditing,
// 	SpecialCharacters,
// 	SpecialCharactersArrows,
// 	SpecialCharactersCurrency,
// 	SpecialCharactersEssentials,
// 	SpecialCharactersLatin,
// 	SpecialCharactersMathematical,
// 	SpecialCharactersText,
// 	Strikethrough,
// 	Style,
// 	Subscript,
// 	Superscript,
// 	Table,
// 	TableCaption,
// 	TableCellProperties,
// 	TableColumnResize,
// 	TableProperties,
// 	TableToolbar,
// 	TextPartLanguage,
// 	TextTransformation,
// 	Title,
// 	TodoList,
// 	Underline,
// 	WordCount
// } from 'ckeditor5';

// import 'ckeditor5/ckeditor5.css';

// // import './App.css';

// /**
//  * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
//  */
// const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

// export default function Editor(props) {
// 	const editorContainerRef = useRef(null);
// 	const editorRef = useRef(null);
// 	const editorWordCountRef = useRef(null);
// 	const [isLayoutReady, setIsLayoutReady] = useState(false);

// 	useEffect(() => {
// 		setIsLayoutReady(true);

// 		return () => setIsLayoutReady(false);
// 	}, []);

// 	const { editorConfig } = useMemo(() => {
// 		if (!isLayoutReady) {
// 			return {};
// 		}

// 		return {
// 			editorConfig: {
// 				toolbar: {
// 					items: [
// 						'undo',
// 						'redo',
// 						'|',
// 						'sourceEditing',
// 						'showBlocks',
// 						'findAndReplace',
// 						'textPartLanguage',
// 						'fullscreen',
// 						'|',
// 						'heading',
// 						'style',
// 						'|',
// 						'fontSize',
// 						'fontFamily',
// 						'fontColor',
// 						'fontBackgroundColor',
// 						'|',
// 						'bold',
// 						'italic',
// 						'underline',
// 						'strikethrough',
// 						'subscript',
// 						'superscript',
// 						'code',
// 						'removeFormat',
// 						'|',
// 						'emoji',
// 						'specialCharacters',
// 						'horizontalLine',
// 						'pageBreak',
// 						'link',
// 						'bookmark',
// 						'insertImage',
// 						'insertTable',
// 						'highlight',
// 						'blockQuote',
// 						'codeBlock',
// 						'htmlEmbed',
// 						'|',
// 						'alignment',
// 						'|',
// 						'bulletedList',
// 						'numberedList',
// 						'todoList',
// 						'outdent',
// 						'indent'
// 					],
// 					shouldNotGroupWhenFull: false
// 				},
// 				plugins: [
// 					Alignment,
// 					Autoformat,
// 					AutoImage,
// 					AutoLink,
// 					Autosave,
// 					BalloonToolbar,
// 					BlockQuote,
// 					BlockToolbar,
// 					Bold,
// 					Bookmark,
// 					CloudServices,
// 					Code,
// 					CodeBlock,
// 					Emoji,
// 					Essentials,
// 					FindAndReplace,
// 					FontBackgroundColor,
// 					FontColor,
// 					FontFamily,
// 					FontSize,
// 					FullPage,
// 					Fullscreen,
// 					GeneralHtmlSupport,
// 					Heading,
// 					Highlight,
// 					HorizontalLine,
// 					HtmlComment,
// 					HtmlEmbed,
// 					ImageBlock,
// 					ImageCaption,
// 					ImageInline,
// 					ImageInsert,
// 					ImageInsertViaUrl,
// 					ImageResize,
// 					ImageStyle,
// 					ImageTextAlternative,
// 					ImageToolbar,
// 					ImageUpload,
// 					Indent,
// 					IndentBlock,
// 					Italic,
// 					Link,
// 					LinkImage,
// 					List,
// 					ListProperties,
// 					Mention,
// 					PageBreak,
// 					Paragraph,
// 					RemoveFormat,
// 					ShowBlocks,
// 					SimpleUploadAdapter,
// 					SourceEditing,
// 					SpecialCharacters,
// 					SpecialCharactersArrows,
// 					SpecialCharactersCurrency,
// 					SpecialCharactersEssentials,
// 					SpecialCharactersLatin,
// 					SpecialCharactersMathematical,
// 					SpecialCharactersText,
// 					Strikethrough,
// 					Style,
// 					Subscript,
// 					Superscript,
// 					Table,
// 					TableCaption,
// 					TableCellProperties,
// 					TableColumnResize,
// 					TableProperties,
// 					TableToolbar,
// 					TextPartLanguage,
// 					TextTransformation,
// 					Title,
// 					TodoList,
// 					Underline,
// 					WordCount
// 				],
// 				balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
// 				blockToolbar: [
// 					'fontSize',
// 					'fontColor',
// 					'fontBackgroundColor',
// 					'|',
// 					'bold',
// 					'italic',
// 					'|',
// 					'link',
// 					'insertImage',
// 					'insertTable',
// 					'|',
// 					'bulletedList',
// 					'numberedList',
// 					'outdent',
// 					'indent'
// 				],
// 				fontFamily: {
// 					supportAllValues: true
// 				},
// 				fontSize: {
// 					options: [10, 12, 14, 'default', 18, 20, 22],
// 					supportAllValues: true
// 				},
// 				fullscreen: {
// 					onEnterCallback: container =>
// 						container.classList.add(
// 							'editor-container',
// 							'editor-container_classic-editor',
// 							'editor-container_include-style',
// 							'editor-container_include-block-toolbar',
// 							'editor-container_include-word-count',
// 							'editor-container_include-fullscreen',
// 							'main-container'
// 						)
// 				},
// 				heading: {
// 					options: [
// 						{
// 							model: 'paragraph',
// 							title: 'Paragraph',
// 							class: 'ck-heading_paragraph'
// 						},
// 						{
// 							model: 'heading1',
// 							view: 'h1',
// 							title: 'Heading 1',
// 							class: 'ck-heading_heading1'
// 						},
// 						{
// 							model: 'heading2',
// 							view: 'h2',
// 							title: 'Heading 2',
// 							class: 'ck-heading_heading2'
// 						},
// 						{
// 							model: 'heading3',
// 							view: 'h3',
// 							title: 'Heading 3',
// 							class: 'ck-heading_heading3'
// 						},
// 						{
// 							model: 'heading4',
// 							view: 'h4',
// 							title: 'Heading 4',
// 							class: 'ck-heading_heading4'
// 						},
// 						{
// 							model: 'heading5',
// 							view: 'h5',
// 							title: 'Heading 5',
// 							class: 'ck-heading_heading5'
// 						},
// 						{
// 							model: 'heading6',
// 							view: 'h6',
// 							title: 'Heading 6',
// 							class: 'ck-heading_heading6'
// 						}
// 					]
// 				},
// 				htmlSupport: {
// 					allow: [
// 						{
// 							name: /^.*$/,
// 							styles: true,
// 							attributes: true,
// 							classes: true
// 						}
// 					]
// 				},
// 				image: {
// 					toolbar: [
// 						'toggleImageCaption',
// 						'imageTextAlternative',
// 						'|',
// 						'imageStyle:inline',
// 						'imageStyle:wrapText',
// 						'imageStyle:breakText',
// 						'|',
// 						'resizeImage'
// 					]
// 				},
// 				initialData: props.initialData || '',
//                 licenseKey: LICENSE_KEY,
// 				link: {
// 					addTargetToExternalLinks: true,
// 					defaultProtocol: 'https://',
// 					decorators: {
// 						toggleDownloadable: {
// 							mode: 'manual',
// 							label: 'Downloadable',
// 							attributes: {
// 								download: 'file'
// 							}
// 						}
// 					}
// 				},
// 				list: {
// 					properties: {
// 						styles: true,
// 						startIndex: true,
// 						reversed: true
// 					}
// 				},
// 				mention: {
// 					feeds: [
// 						{
// 							marker: '@',
// 							feed: [
// 								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
// 							]
// 						}
// 					]
// 				},
// 				placeholder: 'Type or paste your content here!',
// 				style: {
// 					definitions: [
// 						{
// 							name: 'Article category',
// 							element: 'h3',
// 							classes: ['category']
// 						},
// 						{
// 							name: 'Title',
// 							element: 'h2',
// 							classes: ['document-title']
// 						},
// 						{
// 							name: 'Subtitle',
// 							element: 'h3',
// 							classes: ['document-subtitle']
// 						},
// 						{
// 							name: 'Info box',
// 							element: 'p',
// 							classes: ['info-box']
// 						},
// 						{
// 							name: 'CTA Link Primary',
// 							element: 'a',
// 							classes: ['button', 'button--green']
// 						},
// 						{
// 							name: 'CTA Link Secondary',
// 							element: 'a',
// 							classes: ['button', 'button--black']
// 						},
// 						{
// 							name: 'Marker',
// 							element: 'span',
// 							classes: ['marker']
// 						},
// 						{
// 							name: 'Spoiler',
// 							element: 'span',
// 							classes: ['spoiler']
// 						}
// 					]
// 				},
// 				table: {
// 					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
// 				}
// 			}
// 		};
// 	}, [isLayoutReady]);

// 	return (
// 		<div className="main-container">
// 			<div
// 				className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-word-count editor-container_include-fullscreen"
// 				ref={editorContainerRef}
// 			>
// 				<div className="editor-container__editor">
// 					<div ref={editorRef}>
// 						{editorConfig && (
// 							<CKEditor
//                             onChange={props?.onChange}
// 								onReady={editor => {
// 									const wordCount = editor.plugins.get('WordCount');
// 									editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
// 								}}
// 								onAfterDestroy={() => {
// 									Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
// 								}}
// 								editor={ClassicEditor}
// 								config={editorConfig}
// 							/>
// 						)}
// 					</div>
// 				</div>
// 				<div className="editor_container__word-count" ref={editorWordCountRef}></div>
// 			</div>
// 		</div>
// 	);
// }








import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Autoformat,
    AutoImage,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    CloudServices,
    Essentials,
    FindAndReplace,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    ShowBlocks,
    SimpleUploadAdapter,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    Title,
    TodoList,
    Underline,
    WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

// import './App.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function Editor(props) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                toolbar: {
                    items: [
                        'sourceEditing',
                        'showBlocks',
                        'findAndReplace',
                        'textPartLanguage',
                        '|',
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'specialCharacters',
                        'pageBreak',
                        'link',
                        'insertImage',
                        'mediaEmbed',
                        'insertTable',
                        'blockQuote',
                        'htmlEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    Autoformat,
                    AutoImage,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    BlockToolbar,
                    Bold,
                    CloudServices,
                    Essentials,
                    FindAndReplace,
                    FullPage,
                    GeneralHtmlSupport,
                    Heading,
                    HtmlComment,
                    HtmlEmbed,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsert,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    PageBreak,
                    Paragraph,
                    PasteFromOffice,
                    ShowBlocks,
                    SimpleUploadAdapter,
                    SourceEditing,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextPartLanguage,
                    TextTransformation,
                    Title,
                    TodoList,
                    Underline,
                    WordCount
                ],
                balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
                blockToolbar: [
                    'bold',
                    'italic',
                    '|',
                    'link',
                    'insertImage',
                    'insertTable',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'outdent',
                    'indent'
                ],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                initialData: props.initialData || '',
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                placeholder: 'Type or paste your content here!',
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                }
            }
        };
    }, [isLayoutReady]);

    return (
        <div className="main-container">
            <div
                className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-word-count"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {editorConfig && (
                            <CKEditor
                                onChange={props?.onChange}
                                onReady={editor => {
                                    const wordCount = editor.plugins.get('WordCount');
                                    editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                                }}
                                onAfterDestroy={() => {
                                    Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
                                }}
                                editor={ClassicEditor}
                                config={editorConfig}
                            />
                        )}
                    </div>
                </div>
                <div className="editor_container__word-count" ref={editorWordCountRef}></div>
            </div>
        </div>
    );
}