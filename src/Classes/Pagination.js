var _ = require('lodash');

export class Pagination
{
    /**
     * Set the length of the pagination.
     * 
     * @param {integer} length 
     */
    static setNumberOfPages(length) {
        let pages = Array(length);
        _.fill(pages, null);

        return pages;
    }

    static getPageList(current, threshold, range, total) //getPageList(2, 3, 20, 200) 
    {
        let pagination = this.makeList(1, total);

        if (total <= range) {
            return pagination;
        }

        let between_render = this._renderBetween(pagination, current, threshold, total);
        if (between_render) return between_render;

        let start_render = this._renderStart(current, threshold, total, pagination, range);
        if (start_render) return start_render;

        let end_render = this._renderEnd(current, total, threshold, range, pagination);
        if (end_render) return end_render;

        return pagination;

    }

    static _getThresholds(current, total, th)
    {
        let thL = current - th;
        let thR = current + th;
        
        if (thL <= 1) {
            thL = 1;
            thR = (2 * th) + 1;
        }

        if (thR >= total) {
            thR = total;
            thL = total - (2 * th);
        }

        return {
            left: thL,
            right: thR
        }
    }

    static _renderBetween(pagination, current, th, total)
    {
        let thresholdIni = (th * 2) + 1;
        let thresholdEnd = total - (th * 2);

        if ((current >= thresholdIni) && (current <= thresholdEnd)) {
            pagination = this.getBetween(current, th);
            pagination.push("...", total);
            pagination.unshift(1, "...");
            return pagination;
        } else {
            return null;
        }
    }

    static _renderStart(current, th, total, pagination, range)
    {
        let thresholdIni = (th * 2) + 1;

        if (current < thresholdIni) {
            pagination = _.slice(pagination, 0, range - 2);
            pagination.push('...', total);

            return pagination;
        }
        return null;
    }

    static _renderEnd(current, total, th, range, pagination)
    {
        let thresholdEnd = total - (th * 2);

        if (current > thresholdEnd) {
            pagination = _.slice(pagination, -(range - 2));
            pagination.unshift(1, '...');

            return pagination;
        }
        return null;
    }

    static getBetween(current, range)
    {

        let start = current - range;
        let end = current + range;
        let between = this.makeList(start, end);

        return between;

    }

    static makeList(start, end)
    {
        let list = [];
        for(let i = start; i <= end; i ++)
        {
            list.push(i);
        }
        return list;
    }
}