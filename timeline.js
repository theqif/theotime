function timeline (start_string)
{
    this.start_string  = start_string;
    return this._init();
}

function cool_numbers ()
{
    return [
        1,2,3,4,5,6,7,8,9,
        10,20,30,40,50,60,69,70,80,90,
        100, 123,
        1000, 1234,
        10000, 12345,
        100000, 123456,
        1000000, 1234567,
        10000000, 12345678,
        100000000, 123456789,
        1000000000, 1234567890,
    ];
}

function periods ()
{
    return [
        'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'
    ];
}

timeline.prototype._init = function ()
{
    this.start_epoch   = new Date(this.start_string).getTime();
    this.now_string    = new Date();
    this.now_epoch     = new Date().getTime();
    this.milestones    = new Array();

    this.total_seconds = parseInt((this.now_epoch - this.start_epoch) / 1000 );

    this.calculate_age();

console.log(this.age);

    var b = this;

    cool_numbers().forEach(function(n)
    {
        periods().forEach (function(p)
        {
            b.make_a_milestone(n, p);
        });
    });

    b.make_a_milestone(200,'days');
    b.make_a_milestone(17, 'years');
    b.make_a_milestone(18, 'years');
    b.make_a_milestone(21, 'years');
    b.make_a_milestone(30000000, 'seconds');

    this.order_milestones();

    return this;
};

timeline.prototype.make_a_milestone = function (delta, type)
{
console.log('making a milestone for plus :'+delta+' '+type);

    var e;

    if (type === 'seconds')
    {
        e = this.start_epoch + (1000*delta);
    }
    if (type === 'minutes')
    {
        e = this.start_epoch + (1000*delta * 60);
    }
    if (type === 'hours')
    {
        e = this.start_epoch + (1000*delta * 60 * 60);
    }
    if (type === 'days')
    {
        e = this.start_epoch + (1000*delta * 60 * 60 * 24);
    }
    if (type === 'weeks')
    {
        e = this.start_epoch + (1000*delta * 60 * 60 * 24 * 7);
    }
    if (type === 'months')
    {
        var mDate = new Date(this.start_string);
        var month = mDate.getMonth() + delta;
                    mDate.setMonth(month);
        e         = mDate.getTime();
    }
    if (type === 'years')
    {
        var mDate = new Date(this.start_string);
        var year  = mDate.getYear() + 1900 + delta;
                    mDate.setYear (year);
        e         = mDate.getTime();
    }

    if (isNaN (e))
        return;
    if (e > 4543988400000)
        return;

    var past = (e < this.now_epoch) ? true : false;
    this.milestones.push({ epoch: e, date: new Date (e), label: '+'+delta+' '+type, past: past });
};

timeline.prototype.order_milestones = function ()
{
    this.milestones.sort(function(a,b) { return a.epoch - b.epoch } );
    return this;
};

timeline.prototype.delta_seconds = function (start, delta)
{
    return new Date(start + (delta * 1000));
};

timeline.prototype.calculate_age = function ()
{
    this.age =
    {
        seconds     : this.total_seconds,
        minutes     : parseInt(this.total_seconds / (60         )),
        hours       : parseInt(this.total_seconds / (60*60      )),
        days        : parseInt(this.total_seconds / (60*60*24   )),
        weeks       : parseInt(this.total_seconds / (60*60*24*7 ))
    };

    return this;
};

timeline.prototype.currently = function ()
{
    var now = new Date();
    return "On "+now+" Theodore was<br/>"
        +this.age.seconds +" seconds<br/>"
        +this.age.minutes +" minutes<br/>"
        +this.age.hours   +" hours<br/>"
        +this.age.days    +" days<br/>"
        +this.age.weeks   +" weeks<br/>";
};
timeline.prototype.render = function (selector)
{
    $(selector).append(this.currently());

    $.each(this.milestones, function (idx, ms)
    {
        if (ms.past)
        {
            $(selector).append("Theodore was "+ms.label+" old at "+ms.date+'<br/>');
        }
        else
        {
            //$(selector).append("<b>Theodore will be "+ms.label+" old on "+ms.date+'</b> which is ['+ms.epoch+']<br/>');
            $(selector).append("<b>Theodore will be "+ms.label+" old on "+ms.date+'</b><br/>');
        }
        console.log(ms);

    });
};
