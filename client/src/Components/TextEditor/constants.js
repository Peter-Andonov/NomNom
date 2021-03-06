import boldIcon from '../../Images/Icons/format_bold-24px.svg';
import italicIcon from '../../Images/Icons/format_italic-24px.svg';
import underlineIcon from '../../Images/Icons/format_underlined-24px.svg';
import strikethroughIcon from '../../Images/Icons/strikethrough_s-24px.svg';
import unorderedListIcon from '../../Images/Icons/format_list_bulleted-24px.svg';
import orderedListIcon from '../../Images/Icons/format_list_numbered-24px.svg';
import insertLink from '../../Images/Icons/insert_link-24px.svg';
import blockquoteIcon from '../../Images/Icons/format_quote-24px.svg';
import headerIcon from '../../Images/Icons/format_size-24px.svg';

export const inlineStyles = [
    {
        name: 'bold',
        style: 'BOLD',
        icon: boldIcon
    },
    {
        name: 'italic',
        style: 'ITALIC',
        icon: italicIcon
    },
    {
        name: 'underline',
        style: 'UNDERLINE',
        icon: underlineIcon
    },
    {
        name: 'strikethrough',
        style: 'STRIKETHROUGH',
        icon: strikethroughIcon
    }
]

export const blockStyles = [
    {
        name: 'header',
        style: 'header-three',
        icon: headerIcon
    },
    {
        name: 'blockquote',
        style: 'blockquote',
        icon: blockquoteIcon
    },
    {
        name: 'unordered-list-item',
        style: 'unordered-list-item',
        icon: unorderedListIcon
    },
    {
        name: 'ordered-list-item',
        style: 'ordered-list-item',
        icon: orderedListIcon
    }
]

export const enableLink =
{
    name: 'link',
    type: 'LINK',
    icon: insertLink
}