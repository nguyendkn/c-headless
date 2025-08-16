/**
 * Comprehensive Markdown to HTML Converter
 * Supports CommonMark, GitHub Flavored Markdown (GFM), and extended syntax
 * with Tailwind CSS styling and dark/light mode support
 */

// Types and Interfaces
export interface MarkdownOptions {
  enableGFM?: boolean;
  enableMath?: boolean;
  enableMermaid?: boolean;
  enableFootnotes?: boolean;
  enableTables?: boolean;
  enableTaskLists?: boolean;
  enableStrikethrough?: boolean;
  enableDefinitionLists?: boolean;
  sanitizeHtml?: boolean;
  baseUrl?: string;
}

export interface ParsedElement {
  type: string;
  content: string;
  attributes?: Record<string, string>;
  children?: ParsedElement[];
  raw?: string;
}

export interface FootnoteReference {
  id: string;
  label: string;
  content: string;
  backref: number;
}

export interface TableCell {
  content: string;
  align: 'left' | 'center' | 'right' | null;
  isHeader: boolean;
}

export interface TableRow {
  cells: TableCell[];
  isHeader: boolean;
}

export interface MathExpression {
  type: 'inline' | 'block';
  content: string;
  raw: string;
}

// Default options
const DEFAULT_OPTIONS: MarkdownOptions = {
  enableGFM: true,
  enableMath: true,
  enableMermaid: true,
  enableFootnotes: true,
  enableTables: true,
  enableTaskLists: true,
  enableStrikethrough: true,
  enableDefinitionLists: true,
  sanitizeHtml: true,
  baseUrl: '',
};

// Regex patterns for various markdown elements
const PATTERNS = {
  // Headers
  ATX_HEADER: /^(#{1,6})\s+(.+?)(?:\s+#*)?$/gm,
  SETEXT_HEADER: /^(.+?)\n(=+|-+)$/gm,

  // Emphasis and strong
  BOLD_ASTERISK: /\*\*([^*]+)\*\*/g,
  BOLD_UNDERSCORE: /__([^_]+)__/g,
  ITALIC_ASTERISK: /\*([^*]+)\*/g,
  ITALIC_UNDERSCORE: /_([^_]+)_/g,

  // Strikethrough (GFM)
  STRIKETHROUGH: /~~([^~]+)~~/g,

  // Code
  INLINE_CODE: /`([^`]+)`/g,
  CODE_BLOCK: /^```(\w*)\n([\s\S]*?)^```$/gm,
  INDENTED_CODE: /^(?: {4}|\t)(.*)$/gm,

  // Links and images
  LINK: /\[([^\]]*)\]\(([^)]+)\)/g,
  REFERENCE_LINK: /\[([^\]]*)\]\[([^\]]*)\]/g,
  IMAGE: /!\[([^\]]*)\]\(([^)]+)\)/g,
  REFERENCE_IMAGE: /!\[([^\]]*)\]\[([^\]]*)\]/g,
  AUTOLINK: /<(https?:\/\/[^>]+)>/g,
  EMAIL_AUTOLINK: /<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g,

  // Lists
  UNORDERED_LIST: /^(\s*)([-*+])\s+(.+)$/gm,
  ORDERED_LIST: /^(\s*)(\d+\.)\s+(.+)$/gm,

  // Task lists (GFM)
  TASK_LIST: /^(\s*)([-*+])\s+\[([ xX])\]\s+(.+)$/gm,

  // Blockquotes
  BLOCKQUOTE: /^>\s*(.*)$/gm,

  // Horizontal rules
  HORIZONTAL_RULE: /^(?:---+|___+|\*\*\*+)\s*$/gm,

  // Tables (GFM)
  TABLE_ROW: /^\|(.+)\|$/gm,
  TABLE_SEPARATOR: /^\|?(\s*:?-+:?\s*\|)*\s*:?-+:?\s*\|?$/,

  // Math expressions
  MATH_BLOCK: /^\$\$\n([\s\S]*?)\n\$\$$/gm,
  MATH_INLINE: /\$([^$\n]+)\$/g,

  // Mermaid diagrams
  MERMAID: /^```mermaid\n([\s\S]*?)^```$/gm,

  // Footnotes
  FOOTNOTE_DEFINITION: /^\[\^([^\]]+)\]:\s*(.+)$/gm,
  FOOTNOTE_REFERENCE: /\[\^([^\]]+)\]/g,

  // Definition lists
  DEFINITION_TERM: /^([^:\n]+)$/gm,
  DEFINITION_DESCRIPTION: /^:\s+(.+)$/gm,

  // Line breaks
  HARD_BREAK: /  \n/g,
  SOFT_BREAK: /\n/g,

  // HTML tags (for sanitization)
  HTML_TAG: /<\/?[^>]+>/g,

  // Reference definitions
  REFERENCE_DEFINITION: /^\[([^\]]+)\]:\s*(.+?)(?:\s+"([^"]*)")?$/gm,
};

// Tailwind CSS classes for styling
const TAILWIND_CLASSES = {
  // Typography
  h1: 'text-4xl font-bold mb-6 mt-8 text-foreground border-b border-border pb-2',
  h2: 'text-3xl font-semibold mb-5 mt-7 text-foreground border-b border-border pb-2',
  h3: 'text-2xl font-semibold mb-4 mt-6 text-foreground',
  h4: 'text-xl font-semibold mb-3 mt-5 text-foreground',
  h5: 'text-lg font-semibold mb-2 mt-4 text-foreground',
  h6: 'text-base font-semibold mb-2 mt-3 text-foreground',

  // Paragraphs and text
  p: 'mb-4 text-foreground leading-relaxed',
  strong: 'font-semibold text-foreground',
  em: 'italic text-foreground',
  del: 'line-through text-muted-foreground',

  // Code
  code: 'bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground border',
  pre: 'bg-muted p-4 rounded-lg overflow-x-auto mb-4 border',
  codeBlock: 'bg-muted text-foreground font-mono text-sm leading-relaxed',

  // Links
  a: 'text-primary hover:text-primary/80 underline underline-offset-2 transition-colors',

  // Images
  img: 'max-w-full h-auto rounded-lg shadow-sm',

  // Lists
  ul: 'list-disc list-inside mb-4 space-y-1 text-foreground ml-4',
  ol: 'list-decimal list-inside mb-4 space-y-1 text-foreground ml-4',
  li: 'text-foreground leading-relaxed',

  // Task lists
  taskList: 'list-none mb-4 space-y-2 text-foreground',
  taskItem: 'flex items-start gap-2 text-foreground leading-relaxed',
  taskCheckbox: 'mt-1 h-4 w-4 rounded border-2 border-border',
  taskChecked: 'bg-primary border-primary',
  taskUnchecked: 'bg-background',

  // Blockquotes
  blockquote:
    'border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r text-foreground italic',

  // Tables
  table:
    'w-full border-collapse border border-border rounded-lg overflow-hidden mb-4',
  thead: 'bg-muted',
  tbody: 'bg-background',
  tr: 'border-b border-border',
  th: 'px-4 py-2 text-left font-semibold text-foreground border-r border-border last:border-r-0',
  td: 'px-4 py-2 text-foreground border-r border-border last:border-r-0',

  // Horizontal rule
  hr: 'border-0 border-t border-border my-8',

  // Math
  mathInline: 'inline-block mx-1',
  mathBlock: 'block my-4 text-center overflow-x-auto',

  // Mermaid
  mermaid: 'my-6 text-center',

  // Footnotes
  footnoteRef:
    'text-xs text-primary hover:text-primary/80 no-underline align-super',
  footnoteList: 'mt-8 pt-4 border-t border-border text-sm',
  footnoteItem: 'mb-2 text-muted-foreground',
  footnoteBackref: 'text-primary hover:text-primary/80 no-underline ml-2',

  // Definition lists
  dl: 'mb-4',
  dt: 'font-semibold text-foreground mb-1',
  dd: 'ml-4 mb-2 text-foreground text-muted-foreground',
};

/**
 * Main class for converting Markdown to HTML
 */
export class MarkdownConverter {
  private options: MarkdownOptions;
  private footnotes: Map<string, FootnoteReference> = new Map();
  private references: Map<string, { url: string; title?: string }> = new Map();

  constructor(options: Partial<MarkdownOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Convert markdown string to HTML
   */
  public convert(markdown: string): string {
    // Reset state
    this.footnotes.clear();
    this.references.clear();

    // Normalize line endings
    let html = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Extract reference definitions
    html = this.extractReferences(html);

    // Extract footnote definitions
    if (this.options.enableFootnotes) {
      html = this.extractFootnotes(html);
    }

    // Process block-level elements first
    html = this.processBlockElements(html);

    // Process inline elements
    html = this.processInlineElements(html);

    // Add footnotes at the end
    if (this.options.enableFootnotes && this.footnotes.size > 0) {
      html += this.renderFootnotes();
    }

    return html.trim();
  }

  /**
   * Extract reference definitions from markdown
   */
  private extractReferences(markdown: string): string {
    return markdown.replace(
      PATTERNS.REFERENCE_DEFINITION,
      (_, label, url, title) => {
        this.references.set(label.toLowerCase(), {
          url: url.trim(),
          title: title?.trim(),
        });
        return '';
      }
    );
  }

  /**
   * Extract footnote definitions from markdown
   */
  private extractFootnotes(markdown: string): string {
    return markdown.replace(
      PATTERNS.FOOTNOTE_DEFINITION,
      (_, label, content) => {
        this.footnotes.set(label, {
          id: label,
          label,
          content: content.trim(),
          backref: 0,
        });
        return '';
      }
    );
  }

  /**
   * Process block-level elements
   */
  private processBlockElements(markdown: string): string {
    let html = markdown;

    // Process Mermaid diagrams first (before code blocks)
    if (this.options.enableMermaid) {
      html = this.processMermaid(html);
    }

    // Process math blocks
    if (this.options.enableMath) {
      html = this.processMathBlocks(html);
    }

    // Process code blocks
    html = this.processCodeBlocks(html);

    // Process tables
    if (this.options.enableTables) {
      html = this.processTables(html);
    }

    // Process headers
    html = this.processHeaders(html);

    // Process blockquotes
    html = this.processBlockquotes(html);

    // Process lists (including task lists)
    html = this.processLists(html);

    // Process horizontal rules
    html = this.processHorizontalRules(html);

    // Process definition lists
    if (this.options.enableDefinitionLists) {
      html = this.processDefinitionLists(html);
    }

    // Process paragraphs (should be last for block elements)
    html = this.processParagraphs(html);

    return html;
  }

  /**
   * Process inline elements
   */
  private processInlineElements(html: string): string {
    // Process images first (before links)
    html = this.processImages(html);

    // Process links
    html = this.processLinks(html);

    // Process footnote references
    if (this.options.enableFootnotes) {
      html = this.processFootnoteReferences(html);
    }

    // Process inline code
    html = this.processInlineCode(html);

    // Process math inline
    if (this.options.enableMath) {
      html = this.processMathInline(html);
    }

    // Process emphasis and strong
    html = this.processEmphasis(html);

    // Process strikethrough
    if (this.options.enableStrikethrough) {
      html = this.processStrikethrough(html);
    }

    // Process autolinks
    html = this.processAutolinks(html);

    // Process line breaks
    html = this.processLineBreaks(html);

    return html;
  }

  /**
   * Process headers (ATX and Setext style)
   */
  private processHeaders(html: string): string {
    // ATX headers (# ## ### etc.)
    html = html.replace(PATTERNS.ATX_HEADER, (_, hashes, content) => {
      const level = hashes.length;
      const tag = `h${level}`;
      const classes = TAILWIND_CLASSES[tag as keyof typeof TAILWIND_CLASSES];
      const id = this.generateId(content);
      return `<${tag} id="${id}" class="${classes}">${content.trim()}</${tag}>`;
    });

    // Setext headers (underlined with = or -)
    html = html.replace(PATTERNS.SETEXT_HEADER, (_, content, underline) => {
      const level = underline[0] === '=' ? 1 : 2;
      const tag = `h${level}`;
      const classes = TAILWIND_CLASSES[tag as keyof typeof TAILWIND_CLASSES];
      const id = this.generateId(content);
      return `<${tag} id="${id}" class="${classes}">${content.trim()}</${tag}>`;
    });

    return html;
  }

  /**
   * Generate ID for headers
   */
  private generateId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  /**
   * Process code blocks
   */
  private processCodeBlocks(html: string): string {
    // Fenced code blocks
    html = html.replace(PATTERNS.CODE_BLOCK, (_, language, code) => {
      const escapedCode = this.escapeHtml(code.trim());
      const langClass = language ? ` language-${language}` : '';
      return `<pre class="${TAILWIND_CLASSES.pre}"><code class="${TAILWIND_CLASSES.codeBlock}${langClass}">${escapedCode}</code></pre>`;
    });

    // Indented code blocks
    const indentedCodeBlocks: string[] = [];
    const lines = html.split('\n');
    let inCodeBlock = false;
    let codeBlock: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isCodeLine = /^(?: {4}|\t)/.test(line);

      if (isCodeLine) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlock = [];
        }
        codeBlock.push(line.replace(/^(?: {4}|\t)/, ''));
      } else {
        if (inCodeBlock) {
          const escapedCode = this.escapeHtml(codeBlock.join('\n'));
          indentedCodeBlocks.push(
            `<pre class="${TAILWIND_CLASSES.pre}"><code class="${TAILWIND_CLASSES.codeBlock}">${escapedCode}</code></pre>`
          );
          inCodeBlock = false;
        }
        if (line.trim() === '' && inCodeBlock) {
          codeBlock.push('');
        }
      }
    }

    return html;
  }

  /**
   * Process Mermaid diagrams
   */
  private processMermaid(html: string): string {
    return html.replace(PATTERNS.MERMAID, (_, diagram) => {
      const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      return `<div class="${TAILWIND_CLASSES.mermaid}" id="${diagramId}">
        <script type="text/mermaid">${diagram.trim()}</script>
      </div>`;
    });
  }

  /**
   * Process math blocks
   */
  private processMathBlocks(html: string): string {
    return html.replace(PATTERNS.MATH_BLOCK, (_, math) => {
      return `<div class="${TAILWIND_CLASSES.mathBlock}">$$${math.trim()}$$</div>`;
    });
  }

  /**
   * Process math inline
   */
  private processMathInline(html: string): string {
    return html.replace(PATTERNS.MATH_INLINE, (_, math) => {
      return `<span class="${TAILWIND_CLASSES.mathInline}">$${math}$</span>`;
    });
  }

  /**
   * Process tables
   */
  private processTables(html: string): string {
    const lines = html.split('\n');
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check if this line looks like a table row
      if (PATTERNS.TABLE_ROW.test(line)) {
        const tableRows: string[] = [line];
        let j = i + 1;

        // Collect all consecutive table rows
        while (
          j < lines.length &&
          (PATTERNS.TABLE_ROW.test(lines[j]) ||
            PATTERNS.TABLE_SEPARATOR.test(lines[j]))
        ) {
          tableRows.push(lines[j]);
          j++;
        }

        // Check if we have a valid table (at least header + separator + one row)
        if (
          tableRows.length >= 3 &&
          PATTERNS.TABLE_SEPARATOR.test(tableRows[1])
        ) {
          result.push(this.renderTable(tableRows));
          i = j;
          continue;
        }
      }

      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Render a table from table rows
   */
  private renderTable(rows: string[]): string {
    const headerRow = this.parseTableRow(rows[0], true);
    const separatorRow = rows[1];
    const alignments = this.parseTableAlignments(separatorRow);
    const dataRows = rows.slice(2).map(row => this.parseTableRow(row, false));

    let html = `<table class="${TAILWIND_CLASSES.table}">`;

    // Header
    html += `<thead class="${TAILWIND_CLASSES.thead}"><tr class="${TAILWIND_CLASSES.tr}">`;
    headerRow.forEach((cell, index) => {
      const align = alignments[index];
      const alignClass =
        align === 'center'
          ? ' text-center'
          : align === 'right'
            ? ' text-right'
            : '';
      html += `<th class="${TAILWIND_CLASSES.th}${alignClass}">${cell}</th>`;
    });
    html += '</tr></thead>';

    // Body
    html += `<tbody class="${TAILWIND_CLASSES.tbody}">`;
    dataRows.forEach(row => {
      html += `<tr class="${TAILWIND_CLASSES.tr}">`;
      row.forEach((cell, index) => {
        const align = alignments[index];
        const alignClass =
          align === 'center'
            ? ' text-center'
            : align === 'right'
              ? ' text-right'
              : '';
        html += `<td class="${TAILWIND_CLASSES.td}${alignClass}">${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';

    return html;
  }

  /**
   * Parse a table row into cells
   */
  private parseTableRow(row: string, isHeader: boolean): string[] {
    const cells = row
      .replace(/^\||\|$/g, '')
      .split('|')
      .map(cell => cell.trim());

    // Apply header-specific processing if needed
    if (isHeader) {
      return cells.map(cell => cell.replace(/^\s*|\s*$/g, ''));
    }

    return cells;
  }

  /**
   * Parse table column alignments from separator row
   */
  private parseTableAlignments(
    separatorRow: string
  ): ('left' | 'center' | 'right')[] {
    return separatorRow
      .replace(/^\||\|$/g, '')
      .split('|')
      .map(cell => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left';
      });
  }

  /**
   * Process blockquotes
   */
  private processBlockquotes(html: string): string {
    const lines = html.split('\n');
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('>')) {
        const blockquoteLines: string[] = [];

        // Collect all consecutive blockquote lines
        while (
          i < lines.length &&
          (lines[i].startsWith('>') || lines[i].trim() === '')
        ) {
          if (lines[i].startsWith('>')) {
            blockquoteLines.push(lines[i].replace(/^>\s?/, ''));
          } else if (lines[i].trim() === '' && blockquoteLines.length > 0) {
            blockquoteLines.push('');
          }
          i++;
        }

        // Process the blockquote content recursively
        const blockquoteContent = blockquoteLines.join('\n').trim();
        const processedContent = this.processBlockElements(blockquoteContent);
        result.push(
          `<blockquote class="${TAILWIND_CLASSES.blockquote}">${processedContent}</blockquote>`
        );
        continue;
      }

      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Process lists (unordered, ordered, and task lists)
   */
  private processLists(html: string): string {
    const lines = html.split('\n');
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check for task list
      if (this.options.enableTaskLists && PATTERNS.TASK_LIST.test(line)) {
        const { html: taskListHtml, nextIndex } = this.processTaskList(
          lines,
          i
        );
        result.push(taskListHtml);
        i = nextIndex;
        continue;
      }

      // Check for unordered list
      if (PATTERNS.UNORDERED_LIST.test(line)) {
        const { html: listHtml, nextIndex } = this.processUnorderedList(
          lines,
          i
        );
        result.push(listHtml);
        i = nextIndex;
        continue;
      }

      // Check for ordered list
      if (PATTERNS.ORDERED_LIST.test(line)) {
        const { html: listHtml, nextIndex } = this.processOrderedList(lines, i);
        result.push(listHtml);
        i = nextIndex;
        continue;
      }

      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Process task list
   */
  private processTaskList(
    lines: string[],
    startIndex: number
  ): { html: string; nextIndex: number } {
    const listItems: string[] = [];
    let i = startIndex;

    while (i < lines.length) {
      const line = lines[i];
      const taskMatch = line.match(PATTERNS.TASK_LIST);

      if (taskMatch) {
        const [, indent, marker, checked, content] = taskMatch;
        const isChecked = checked.toLowerCase() === 'x';
        const checkboxClass = isChecked
          ? `${TAILWIND_CLASSES.taskCheckbox} ${TAILWIND_CLASSES.taskChecked}`
          : `${TAILWIND_CLASSES.taskCheckbox} ${TAILWIND_CLASSES.taskUnchecked}`;

        // Calculate indentation level for nested task lists
        const indentLevel = Math.floor(indent.length / 2);
        const marginLeft =
          indentLevel > 0
            ? `style="margin-left: ${indentLevel * 1.5}rem;"`
            : '';

        listItems.push(`
          <li class="${TAILWIND_CLASSES.taskItem}" ${marginLeft} data-marker="${marker}">
            <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="${checkboxClass}">
            <span>${content}</span>
          </li>
        `);
        i++;
      } else if (line.trim() === '') {
        i++;
      } else {
        break;
      }
    }

    const html = `<ul class="${TAILWIND_CLASSES.taskList}">${listItems.join('')}</ul>`;
    return { html, nextIndex: i };
  }

  /**
   * Process unordered list
   */
  private processUnorderedList(
    lines: string[],
    startIndex: number
  ): { html: string; nextIndex: number } {
    const listItems: string[] = [];
    let i = startIndex;

    while (i < lines.length) {
      const line = lines[i];
      const listMatch = line.match(PATTERNS.UNORDERED_LIST);

      if (listMatch) {
        const [, indent, marker, content] = listMatch;

        // Calculate indentation level for nested lists
        const indentLevel = Math.floor(indent.length / 2);
        const marginLeft =
          indentLevel > 0
            ? `style="margin-left: ${indentLevel * 1.5}rem;"`
            : '';

        listItems.push(
          `<li class="${TAILWIND_CLASSES.li}" ${marginLeft} data-marker="${marker}">${content}</li>`
        );
        i++;
      } else if (line.trim() === '') {
        i++;
      } else {
        break;
      }
    }

    const html = `<ul class="${TAILWIND_CLASSES.ul}">${listItems.join('')}</ul>`;
    return { html, nextIndex: i };
  }

  /**
   * Process ordered list
   */
  private processOrderedList(
    lines: string[],
    startIndex: number
  ): { html: string; nextIndex: number } {
    const listItems: string[] = [];
    let i = startIndex;

    while (i < lines.length) {
      const line = lines[i];
      const listMatch = line.match(PATTERNS.ORDERED_LIST);

      if (listMatch) {
        const [, indent, marker, content] = listMatch;

        // Calculate indentation level for nested lists
        const indentLevel = Math.floor(indent.length / 2);
        const marginLeft =
          indentLevel > 0
            ? `style="margin-left: ${indentLevel * 1.5}rem;"`
            : '';

        listItems.push(
          `<li class="${TAILWIND_CLASSES.li}" ${marginLeft} data-marker="${marker}">${content}</li>`
        );
        i++;
      } else if (line.trim() === '') {
        i++;
      } else {
        break;
      }
    }

    const html = `<ol class="${TAILWIND_CLASSES.ol}">${listItems.join('')}</ol>`;
    return { html, nextIndex: i };
  }

  /**
   * Escape HTML characters
   */
  private escapeHtml(text: string): string {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return text.replace(/[&<>"']/g, char => htmlEscapes[char]);
  }

  /**
   * Process horizontal rules
   */
  private processHorizontalRules(html: string): string {
    return html.replace(PATTERNS.HORIZONTAL_RULE, () => {
      return `<hr class="${TAILWIND_CLASSES.hr}">`;
    });
  }

  /**
   * Process definition lists
   */
  private processDefinitionLists(html: string): string {
    const lines = html.split('\n');
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check if this is a definition term followed by definition descriptions
      if (
        line.trim() &&
        !line.startsWith(':') &&
        i + 1 < lines.length &&
        lines[i + 1].startsWith(':')
      ) {
        const term = line.trim();
        const descriptions: string[] = [];
        let j = i + 1;

        // Collect all consecutive definition descriptions
        while (j < lines.length && lines[j].startsWith(':')) {
          descriptions.push(lines[j].replace(/^:\s*/, ''));
          j++;
        }

        let html = `<dl class="${TAILWIND_CLASSES.dl}">`;
        html += `<dt class="${TAILWIND_CLASSES.dt}">${term}</dt>`;
        descriptions.forEach(desc => {
          html += `<dd class="${TAILWIND_CLASSES.dd}">${desc}</dd>`;
        });
        html += '</dl>';

        result.push(html);
        i = j;
        continue;
      }

      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Process paragraphs
   */
  private processParagraphs(html: string): string {
    const lines = html.split('\n');
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim() && !this.isBlockElement(line)) {
        const paragraphLines: string[] = [line];
        let j = i + 1;

        // Collect consecutive non-empty lines that aren't block elements
        while (
          j < lines.length &&
          lines[j].trim() &&
          !this.isBlockElement(lines[j])
        ) {
          paragraphLines.push(lines[j]);
          j++;
        }

        const paragraphContent = paragraphLines.join(' ');
        result.push(`<p class="${TAILWIND_CLASSES.p}">${paragraphContent}</p>`);
        i = j;
        continue;
      }

      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  /**
   * Check if a line is a block element
   */
  private isBlockElement(line: string): boolean {
    return (
      line.startsWith('#') ||
      line.startsWith('>') ||
      line.startsWith('```') ||
      line.startsWith('$$') ||
      line.startsWith('<') ||
      /^(?: {4}|\t)/.test(line) ||
      /^[-*+]\s/.test(line) ||
      /^\d+\.\s/.test(line) ||
      /^[-*+]\s+\[[ xX]\]/.test(line) ||
      /^\|.*\|$/.test(line) ||
      /^(?:---+|___+|\*\*\*+)\s*$/.test(line)
    );
  }

  /**
   * Process images
   */
  private processImages(html: string): string {
    // Reference images
    html = html.replace(PATTERNS.REFERENCE_IMAGE, (_, alt, label) => {
      const ref = this.references.get(label.toLowerCase() || alt.toLowerCase());
      if (ref) {
        const title = ref.title ? ` title="${ref.title}"` : '';
        return `<img src="${ref.url}" alt="${alt}" class="${TAILWIND_CLASSES.img}"${title}>`;
      }
      return _;
    });

    // Inline images
    html = html.replace(PATTERNS.IMAGE, (_, alt, src) => {
      const [url, title] = this.parseUrlAndTitle(src);
      const titleAttr = title ? ` title="${title}"` : '';
      return `<img src="${url}" alt="${alt}" class="${TAILWIND_CLASSES.img}"${titleAttr}>`;
    });

    return html;
  }

  /**
   * Process links
   */
  private processLinks(html: string): string {
    // Reference links
    html = html.replace(PATTERNS.REFERENCE_LINK, (_, text, label) => {
      const ref = this.references.get(
        label.toLowerCase() || text.toLowerCase()
      );
      if (ref) {
        const title = ref.title ? ` title="${ref.title}"` : '';
        return `<a href="${ref.url}" class="${TAILWIND_CLASSES.a}"${title}>${text}</a>`;
      }
      return _;
    });

    // Inline links
    html = html.replace(PATTERNS.LINK, (_, text, src) => {
      const [url, title] = this.parseUrlAndTitle(src);
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${url}" class="${TAILWIND_CLASSES.a}"${titleAttr}>${text}</a>`;
    });

    return html;
  }

  /**
   * Parse URL and title from link/image source
   */
  private parseUrlAndTitle(src: string): [string, string | null] {
    const match = src.match(/^([^\s]+)(?:\s+"([^"]*)")?$/);
    if (match) {
      return [match[1], match[2] || null];
    }
    return [src, null];
  }

  /**
   * Process footnote references
   */
  private processFootnoteReferences(html: string): string {
    return html.replace(PATTERNS.FOOTNOTE_REFERENCE, (_, label) => {
      const footnote = this.footnotes.get(label);
      if (footnote) {
        footnote.backref++;
        const id = `fnref-${label}-${footnote.backref}`;
        return `<a href="#fn-${label}" id="${id}" class="${TAILWIND_CLASSES.footnoteRef}">${footnote.backref}</a>`;
      }
      return _;
    });
  }

  /**
   * Process inline code
   */
  private processInlineCode(html: string): string {
    return html.replace(PATTERNS.INLINE_CODE, (_, code) => {
      return `<code class="${TAILWIND_CLASSES.code}">${this.escapeHtml(code)}</code>`;
    });
  }

  /**
   * Process emphasis and strong text
   */
  private processEmphasis(html: string): string {
    // Bold (strong) - process first to avoid conflicts
    html = html.replace(PATTERNS.BOLD_ASTERISK, (_, text) => {
      return `<strong class="${TAILWIND_CLASSES.strong}">${text}</strong>`;
    });

    html = html.replace(PATTERNS.BOLD_UNDERSCORE, (_, text) => {
      return `<strong class="${TAILWIND_CLASSES.strong}">${text}</strong>`;
    });

    // Italic (emphasis)
    html = html.replace(PATTERNS.ITALIC_ASTERISK, (_, text) => {
      return `<em class="${TAILWIND_CLASSES.em}">${text}</em>`;
    });

    html = html.replace(PATTERNS.ITALIC_UNDERSCORE, (_, text) => {
      return `<em class="${TAILWIND_CLASSES.em}">${text}</em>`;
    });

    return html;
  }

  /**
   * Process strikethrough text
   */
  private processStrikethrough(html: string): string {
    return html.replace(PATTERNS.STRIKETHROUGH, (_, text) => {
      return `<del class="${TAILWIND_CLASSES.del}">${text}</del>`;
    });
  }

  /**
   * Process autolinks
   */
  private processAutolinks(html: string): string {
    // URL autolinks
    html = html.replace(PATTERNS.AUTOLINK, (_, url) => {
      return `<a href="${url}" class="${TAILWIND_CLASSES.a}">${url}</a>`;
    });

    // Email autolinks
    html = html.replace(PATTERNS.EMAIL_AUTOLINK, (_, email) => {
      return `<a href="mailto:${email}" class="${TAILWIND_CLASSES.a}">${email}</a>`;
    });

    return html;
  }

  /**
   * Process line breaks
   */
  private processLineBreaks(html: string): string {
    // Hard breaks (two spaces + newline)
    html = html.replace(PATTERNS.HARD_BREAK, '<br>');

    // Soft breaks (single newline) - convert to space
    html = html.replace(PATTERNS.SOFT_BREAK, ' ');

    return html;
  }

  /**
   * Render footnotes section
   */
  private renderFootnotes(): string {
    let html = `<div class="${TAILWIND_CLASSES.footnoteList}">`;
    html += '<h2>Footnotes</h2>';

    this.footnotes.forEach((footnote, label) => {
      html += `<div id="fn-${label}" class="${TAILWIND_CLASSES.footnoteItem}">`;
      html += `${footnote.backref}. ${footnote.content}`;

      // Add back-references
      for (let i = 1; i <= footnote.backref; i++) {
        html += `<a href="#fnref-${label}-${i}" class="${TAILWIND_CLASSES.footnoteBackref}">↩</a>`;
      }

      html += '</div>';
    });

    html += '</div>';
    return html;
  }
}

/**
 * Convenience function to convert markdown to HTML
 */
export function markdownToHtml(
  markdown: string,
  options?: Partial<MarkdownOptions>
): string {
  const converter = new MarkdownConverter(options);
  return converter.convert(markdown);
}

/**
 * Convenience function to convert markdown to HTML with GFM enabled
 */
export function gfmToHtml(
  markdown: string,
  options?: Partial<MarkdownOptions>
): string {
  const gfmOptions: Partial<MarkdownOptions> = {
    enableGFM: true,
    enableTables: true,
    enableTaskLists: true,
    enableStrikethrough: true,
    ...options,
  };

  return markdownToHtml(markdown, gfmOptions);
}

/**
 * Convenience function to convert markdown to HTML with math support
 */
export function markdownWithMathToHtml(
  markdown: string,
  options?: Partial<MarkdownOptions>
): string {
  const mathOptions: Partial<MarkdownOptions> = {
    enableMath: true,
    ...options,
  };

  return markdownToHtml(markdown, mathOptions);
}

/**
 * Convenience function to convert markdown to HTML with all features enabled
 */
export function fullMarkdownToHtml(
  markdown: string,
  options?: Partial<MarkdownOptions>
): string {
  const fullOptions: Partial<MarkdownOptions> = {
    enableGFM: true,
    enableMath: true,
    enableMermaid: true,
    enableFootnotes: true,
    enableTables: true,
    enableTaskLists: true,
    enableStrikethrough: true,
    enableDefinitionLists: true,
    ...options,
  };

  return markdownToHtml(markdown, fullOptions);
}

// Export the main converter class and utility functions
export default MarkdownConverter;
