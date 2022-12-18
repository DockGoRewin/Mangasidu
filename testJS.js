$(window).each(function(){
    var pT = $('html head title')[0].innerText;
    var dataredirect = 'https://mangasidu.blogspot.com/';
    var dataredirectexp = new RegExp(dataredirect, "i");

    if (location.href.search(dataredirect) != -1 ){

    var hF = location.href
    var CallBackChapter = hF.split("/").pop().split('.html');
    var dataCallback = CallBackChapter[0].split('-chapter');

    var infoxExpresSion = new RegExp(dataCallback[0], "i");
    var infoxExpresSion2 = new RegExp(CallBackChapter[0], "i");
    
    $.ajax({
        type: 'GET',
        url: '/feeds/pages/default?alt=json',
        dataType: 'json'
    }).done(function(data) {
      var eU=new Array();
      var eT=new Array();
      var current,k=0;
      var next ='';
      var htmlcode ='';
      var selectCahpter ='';

      for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          if (data.feed.entry[i].link[j].href.search(infoxExpresSion) != -1 ){
           if (data.feed.entry[i].title.$t.indexOf("Chapter") > -1 ) {
            var posttitle = data.feed.entry[i].title.$t.split('Chapter');
            var NumberTitle ='';
             
            for(var ii = 0; ii < posttitle.length; ii++){

             NumberTitle = posttitle[1].replace(/[^0-9\.]+/g,"");
             
            }
            selectCahpter +='<option value="'+posturl+'">Chapter '+NumberTitle+'</option>';
            } else {
            var posttitle = data.feed.entry[i].title.$t
          }
            
            
          } 

          if (data.feed.entry[i].link[j].href.search(infoxExpresSion2) != -1 ){
            var posttitle = data.feed.entry[i].title.$t;
            var author = data.feed.entry[i].author[0].name.$t;
            var text_month = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var get_date = data.feed.entry[i].published.$t;
              var year = get_date.substring(0, 4),
              month = get_date.substring(5, 7),
              day = get_date.substring(8, 10),
              date = text_month[parseInt(month, 10)] + ' ' + day + '. ' + year;

            var content = data.feed.entry[i].content.$t,
            $content = $('<div>').html(content);
             if(content.indexOf("Data-Reader") > -1) {
               var testData = $($content).find('.Data-Reader').html();
               if(content.indexOf("<img") > -1) {
               } else {
               var testData = '<div class="info-image">tidak ada image yang di temukan, Mohon Segera Memberi tau admin untuk memperbarui halaman ini...</div>'
              }
             } else {
               var testData = '<div class="info-image">tidak ada image yang di temukan, Mohon Segera Memberi tau admin untuk memperbarui halaman ini...</div>'
             }

             if(content.indexOf("urlDownload") > -1) {
              var urlDownload = $($content).find('.urlDownload')[0].innerText;
              var urlDownloadUP = 'href="'+$($content).find('.urlDownload')[0].innerText+'"';
              var buttonDownload ='<span class="dlx r link-add"><a href="'+urlDownload+'" target="_blank"><i class="fas fa-cloud-download-alt"></i> Download</a></span>';
              var buttonUPdownload = '<div class="daw dl"><a href="'+urlDownload+'" target="_blank"><i class="fas fa-cloud-download-alt" aria-hidden="true"></i></a></div>'
             } else {

           if(content.indexOf("https://blogger.googleusercontent.com/") > -1) {
              var buttonDownload ='';
              var buttonUPdownload = '';
               } else {
               
               if(content.indexOf("<img") > -1) {
                var buttonUPdownload = '<div class="daw dl autoDownloader" style="cursor: pointer;"><a><i class="fas fa-cloud-download-alt" aria-hidden="true"></i></a></div>';
                var buttonDownload ='<span class="dlx r autoDownloader" style="cursor: pointer;"><a><i class="fas fa-cloud-download-alt"></i> Download</a></span>';
                } else {
                var buttonUPdownload = '';
                var buttonDownload =''
               }

}              

             }

             if (content.indexOf("[infoWebsite]") > -1 ) {
              if (content.indexOf("http://www.youtube.com/embed/") > -1 || content.indexOf("https://www.youtube.com/embed/") > -1 ) {
                var src2 = data.feed.entry[i].media$thumbnail.url.replace('s72-c','s650');
                var thumb = `${src2}`;
              } else if (content.indexOf("<img") > -1 ) {
                 var src = $content.find('img:first').attr('src');
                 var thumb = `${src}`;
             } else {
                 var thumb = 'http://3.bp.blogspot.com/-qnLm52EsvBE/VDkrZ46TWXI/AAAAAAAAAsM/tiJ36WiboU4/s1600/90.jpg';
              }

              if (content.indexOf("tag-halaman") > -1 ) {
               var dataTag = $content.find('.tag-halaman').html();
               } else {
               var dataTag = '';
              }

              if (content.indexOf("data-Website") > -1 ) {
               var contentWebsite = $content.find('.data-Website').html();
               } else {
               var contentWebsite = ' Halaman ini Belum Mempunyai isi tolong hubungi admin untuk memperbarui isi halaman ini. ';
              }

              if (content.indexOf("HideComment") > -1 ) {
               var columnbixbox ='';
              } else {
              var comment = "";
              var scriptt = `<\script>

    var disqus_config = function () {
        this.page.url = '${hF}'; 
        this.page.identifier = '/${CallBackChapter[0]}.html';
    };

    (function() {  
        var d = document, s = d.createElement('script');
        
        s.src = 'https://mangasidu.disqus.com/embed.js';  
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
  <\/script>
  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>`

  var columnbixbox = "<div class='bixbox comments-area' id='comments'><div class='releases'><h2><span>Comment</span></h2></div><div class='cmt commentx'><div id='disqus_thread'>"+comment+"</div></div></div>"+scriptt+"";

              }

               htmlcode +='<div class="bixbox blogpost"><header class="entry-header"><h1 class="entry-title" itemprop="headline"> '+posttitle+' </h1><div class="entry-meta"><span class="author vcard"><i class="far fa-user" aria-hidden="true"></i> <b>Posted By:</b> <i class="fn">'+author+'</i></span> · <span><i class="far fa-calendar-alt" aria-hidden="true"></i> <b>Posted On:</b> <time class="updated" datetime="'+get_date+'" itemprop="datePublished">'+date+'</time></span> · <span><i aria-hidden="true" class="fa fa-tags"></i><b>Tags:</b> '+dataTag+'</span></div></header><div class="thumb"><img alt="thumbnail" class="attachment- size- wp-post-image" height="1280" loading="lazy" src="'+thumb+'" width="1920"></div><div class="entry-content" itemprop="text">'+contentWebsite+'</div></div>'+columnbixbox+'';
               $("#pageloader").fadeOut();
             } else {
             }

             if (content.indexOf("[ReaderArea]") > -1 ) {

             if (content.indexOf("http://www.youtube.com/embed/") > -1 || content.indexOf("https://www.youtube.com/embed/") > -1 ) {
                var src2 = data.feed.entry[i].media$thumbnail.url.replace('s72-c','s650');
                var thumb = `${src2}`;
              } else if (content.indexOf("<img") > -1 ) {
                 var src = $content.find('img:first').attr('src');
                 var thumb = `${src}`;
             } else {
                 var thumb = 'http://3.bp.blogspot.com/-qnLm52EsvBE/VDkrZ46TWXI/AAAAAAAAAsM/tiJ36WiboU4/s1600/90.jpg';
              }

// history
var getData = hF;
     var GetName = pT;
     var dThisTime = new Date();
     
     removehistory(getData);
     addhistory(getData, GetName, dThisTime);

    function sethistory(History){
    localStorage.History = JSON.stringify(History);
  }
  function addhistory(getData, GetName, dThisTime) {
    var History = gethistory();
    History.push({
     title: GetName,
     href: getData,
     time: dThisTime
    });
    sethistory(History);
  }
  
  function gethistory(){
    try {
    var History = JSON.parse(localStorage.History);
    return History;
    } catch (e) {
    return [];
    }
  }

  function removehistory(getData){
    var History = gethistory();
    History = $.grep(History, function(value, index) {
      return value.href != getData;
    });
    sethistory(History);
  }
// end history

              $('body').addClass('darkmode black');
              $.ajax({
                 type: 'GET',
                 url: '/feeds/posts/default/-/Series?alt=json',
                 dataType: 'json'
                }).done(function(data1) {
                 var nameHomePage = data1.feed.title.$t;
                 var allChapter ='';
                 var breadcrumb ='';
                 var NavBiodataMelayang ='';
                 var NavBookmark =''
                 var chdesc='';
                 var posturl1 =''
                 for (var i = 0; i < data1.feed.entry.length; i++) {
                  for (var j = 0; j < data1.feed.entry[i].link.length; j++) {
                    if (data1.feed.entry[i].link[j].rel == "alternate") {
                      posturl1 = data1.feed.entry[i].link[j].href;
                      break;
                    }
                  }
                  if (data1.feed.entry[i].link[j].href.search(infoxExpresSion) != -1 ){
                    $("#pageloader").fadeOut();

                    var posttitle1 = data1.feed.entry[i].title.$t;
                    var postID1 = /\.post-?(\d+)(\.|$)/.exec(data1.feed.entry[i].id.$t) ? /\.post-?(\d+)(\.|$)/.exec(data1.feed.entry[i].id.$t)[1] : false;
                    var content1 = data1.feed.entry[i].content.$t,
                       $content1 = $('<div>').html(content1);

                 if (content1.indexOf("http://www.youtube.com/embed/") > -1 || content1.indexOf("https://www.youtube.com/embed/") > -1 ) {
                  var src21 = data1.feed.entry[i].media$thumbnail.url;
                  var thumb1 = ''+src2.replace('s72-c','s720')+'';
                 } else if (content1.indexOf("<img") > -1 ) {
              
                    var src1 = $content1.find('img:first').attr('src');
                    var thumb1 = ''+src1+'';
                  } else {
                    var thumb1 = '"http://3.bp.blogspot.com/-qnLm52EsvBE/VDkrZ46TWXI/AAAAAAAAAsM/tiJ36WiboU4/s1600/90.jpg"';
                  }

                   if (content1.indexOf("RateSeries") > -1 ) {
                    var TotalRate1 = $content1.find('.TotalRate').html();
                    var TtlRate1 = ''+TotalRate1+'';
       
                    var PersenRate1 = $content1.find('.PersenRate').html();
                    var PrsnRate1 = ''+PersenRate1+'';
                   } else {
                    var TtlRate1 = 'N/A';
                    var PrsnRate1 = '';
                   }

for(Type=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Manga"==data1.feed.entry[i].category[sx].term)Type='Manga';else if("Manhua"==data1.feed.entry[i].category[sx].term)Type='Manhua';else if("Manhwa"==data1.feed.entry[i].category[sx].term)Type='Manhwa';

for(pk=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("4-Koma"==data1.feed.entry[i].category[sx].term)var pk='4-Koma, ';
for(Ac=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Action"==data1.feed.entry[i].category[sx].term)Ac='Action, ';
for(Ad=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Adult"==data1.feed.entry[i].category[sx].term)Ad='Adult, ';
for(Adv=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Adventure"==data1.feed.entry[i].category[sx].term)Adv='Adventure, ';
for(Co=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Comedy"==data1.feed.entry[i].category[sx].term)Co='Comedy, ';
for(Coo=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Cooking"==data1.feed.entry[i].category[sx].term)Coo='Cooking, ';
for(Cr=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Crime"==data1.feed.entry[i].category[sx].term)Cr='Crime, ';
for(De=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Demon"==data1.feed.entry[i].category[sx].term)De='Demon, ';
for(Dem=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Demons"==data1.feed.entry[i].category[sx].term)Dem='Demons, ';
for(Do=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Doujinshi"==data1.feed.entry[i].category[sx].term)Do='Doujindhi, ';
for(Dr=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Drama"==data1.feed.entry[i].category[sx].term)Dr='Drama, ';
for(Ec=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Ecchi"==data1.feed.entry[i].category[sx].term)Ec='Ecchi, ';
for(Fa=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Fantasy"==data1.feed.entry[i].category[sx].term)Fa='Fantasy, ';
for(Ga=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Game"==data1.feed.entry[i].category[sx].term)Ga='Game, ';
for(Ge=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Gender bender"==data1.feed.entry[i].category[sx].term)Ge='Gender bender, ';
for(Go=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Gore"==data1.feed.entry[i].category[sx].term)Go='Gore, ';
for(Ha=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Harem"==data1.feed.entry[i].category[sx].term)Ha='Harem, ';
for(Hi=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Historical"==data1.feed.entry[i].category[sx].term)Hi='Historical, ';
for(Ho=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Horror"==data1.feed.entry[i].category[sx].term)Ho='Horror, ';
for(Is=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Isekai"==data1.feed.entry[i].category[sx].term)Is='Isekai, ';
for(Js=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Josei"==data1.feed.entry[i].category[sx].term)Js='Josei, ';
for(Ki=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Kingdom"==data1.feed.entry[i].category[sx].term)Ki='Kingdom, ';
for(Ma=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Magic"==data1.feed.entry[i].category[sx].term)Ma='Magic, ';
for(Lo=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Lolicon"==data1.feed.entry[i].category[sx].term)Lo='Lolicon, ';
for(Mar=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Martial Art"==data1.feed.entry[i].category[sx].term)Mar='Martial Art, ';
for(Mart=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Martial Arts"==data1.feed.entry[i].category[sx].term)Mart='Martial Arts, ';
for(Matu=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Mature"==data1.feed.entry[i].category[sx].term)Matu='Mature, ';
for(Me=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Mecha"==data1.feed.entry[i].category[sx].term)Me='Mecha, ';
for(Med=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Medical"==data1.feed.entry[i].category[sx].term)Med='Medical, ';
for(Mi=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Military"==data1.feed.entry[i].category[sx].term)Mi='Military, ';
for(Mu=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Music"==data1.feed.entry[i].category[sx].term)Mu='Music, ';
for(My=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Mystery"==data1.feed.entry[i].category[sx].term)My='Mystery, ';
for(On=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("One Shot"==data1.feed.entry[i].category[sx].term)On='One Shot, ';
for(Pa=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Parody"==data1.feed.entry[i].category[sx].term)Pa='Parody, ';
for(Po=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Police"==data1.feed.entry[i].category[sx].term)Po='Police, ';
for(Pos=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Post apocalyptic"==data1.feed.entry[i].category[sx].term)Pos='Post apocalyptic, ';
for(Psy=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Psychological"==data1.feed.entry[i].category[sx].term)Psy='Psychological, ';
for(Re=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Reincarnation"==data1.feed.entry[i].category[sx].term)Re='Reincarnation, ';
for(Rev=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Revenge"==data1.feed.entry[i].category[sx].term)Rev='Revenge, ';
for(Ro=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Romance"==data1.feed.entry[i].category[sx].term)Ro='Romance, ';
for(Sa=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Samurai"==data1.feed.entry[i].category[sx].term)Sa='Samurai, ';
for(Sc=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("School"==data1.feed.entry[i].category[sx].term)Sc='School, ';
for(Sch=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("School Life"==data1.feed.entry[i].category[sx].term)Sch='School Life, ';
for(Sci=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Sci-Fi"==data1.feed.entry[i].category[sx].term)Sci='Sci-Fi, ';
for(Se=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Seinen"==data1.feed.entry[i].category[sx].term)Se='Seinen, ';
for(Su=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Supernatural"==data1.feed.entry[i].category[sx].term)Su='Supernatural, ';
for(Sh=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Shotacon"==data1.feed.entry[i].category[sx].term)Sh='Shotacon, ';
for(Sho=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Shoujo"==data1.feed.entry[i].category[sx].term)Sho='Shoujo, ';
for(Shu=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Shoujo Ai"==data1.feed.entry[i].category[sx].term)Shu='Shoujo Ai, ';
for(Shoun=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Shounen"==data1.feed.entry[i].category[sx].term)Shoun='Shounen, ';
for(Shne=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Shounen Ai"==data1.feed.entry[i].category[sx].term)Shne='Shounen Ai, ';
for(Si=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Si-fi"==data1.feed.entry[i].category[sx].term)Si='Si-fi, ';
for(Sl=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Slice of Life"==data1.feed.entry[i].category[sx].term)Sl='Slice of Life, ';
for(Sp=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Space"==data1.feed.entry[i].category[sx].term)Sp='Space, ';
for(Sup=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Super Power"==data1.feed.entry[i].category[sx].term)Sup='Super Power, ';
for(Sy=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("System"==data1.feed.entry[i].category[sx].term)Sy='System, ';
for(Th=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Thriller"==data1.feed.entry[i].category[sx].term)Th='Thriller, ';
for(Tr=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Tragedy"==data1.feed.entry[i].category[sx].term)Tr='Tragedy, ';
for(Va=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Vampire"==data1.feed.entry[i].category[sx].term)Va='Vampire, ';
for(We=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Webtoon"==data1.feed.entry[i].category[sx].term)We='Webtoon, ';
for(Web=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Webtoons"==data1.feed.entry[i].category[sx].term)Web='Webtoons, ';
for(Yur=[],sx=0;sx<data1.feed.entry[i].category.length;sx++)if("Yuri"==data1.feed.entry[i].category[sx].term)Yur='Yuri, ';

 var daftarGenre = ''+pk+Ac+Ad+Adv+Co+Coo+Cr+De+Dem+Do+Dr+Ec+Fa+Ga+Ge+Go+Ha+Hi+Ho+Is+Js+Ki+Ma+Lo+Mar+Mart+Matu+Me+Med+Mi+Mu+My+On+Pa+Po+Pos+Psy+Re+Rev+Ro+Sa+Sc+Sch+Sci+Se+Su+Sh+Sho+Shu+Shoun+Shne+Si+Sl+Sp+Sup+Sy+Th+Tr+Va+We+Web+Yur+'';

 var splitGenre = daftarGenre.substr(0,(daftarGenre.length -2));

var listGenre = splitGenre.split(", ");

$.ajax({
    type: 'GET',
    url: '/feeds/posts/default/-/'+listGenre.splice( ~~(Math.random()*listGenre.length), 1 )[0]+'?alt=json&max-results=7',
    dataType: 'json'
}).done(function(Rlt) {
  var htmlRltd ='';
  for (var i = 0; i < Rlt.feed.entry.length; i++) {
   for (var j = 0; j < Rlt.feed.entry[i].link.length; j++) {
     if (Rlt.feed.entry[i].link[j].rel == "alternate") {
       urlBs = Rlt.feed.entry[i].link[j].href;
       break;
     }
   }
   var nameBs = Rlt.feed.entry[i].title.$t;
   var content = Rlt.feed.entry[i].content.$t,
       $content = $('<div>').html(content);

   if (content.indexOf("http://www.youtube.com/embed/") > -1 || content.indexOf("https://www.youtube.com/embed/") > -1 ) {
     var src2 = Rlt.feed.entry[i].media$thumbnail.url;
     var thumb = '<img src="'+src2.replace('s72-c','s720')+'" class="ts-post-image wp-post-image attachment-medium size-medium" loading="lazy" title="'+posttitle+'" alt="'+posttitle+'">';
   } else if (content.indexOf("<img") > -1 ) {

      var src = $content.find('img:first').attr('src');
      var thumb = '<img src="'+src+'" class="ts-post-image wp-post-image attachment-medium size-medium" loading="lazy" title="'+posttitle+'" alt="'+posttitle+'">';
    } else {
      var thumb = '<img src="http://3.bp.blogspot.com/-qnLm52EsvBE/VDkrZ46TWXI/AAAAAAAAAsM/tiJ36WiboU4/s1600/90.jpg" class="ts-post-image wp-post-image attachment-medium size-medium" loading="lazy" title="'+posttitle+'" alt="'+posttitle+'">';
    }

    if (content.indexOf("RateSeries") > -1 ) {
      var TotalRate = $content.find('.TotalRate').html();
      var TtlRate = ''+TotalRate+'';

      var PersenRate = $content.find('.PersenRate').html();
      var PrsnRate = 'style="width:'+PersenRate+';"';
     } else {
      var TtlRate = 'N/A';
      var PrsnRate = '';
     }

     for(Tipe=[],sx=0;sx<Rlt.feed.entry[i].category.length;sx++)if("Manga"==Rlt.feed.entry[i].category[sx].term)Tipe='<span class="type Manga"></span>';else if("Manhua"==Rlt.feed.entry[i].category[sx].term)Tipe='<span class="type Manhua"></span>';else if("Manhwa"==Rlt.feed.entry[i].category[sx].term)Tipe='<span class="type Manhwa"></span>';

     for(Status=[],sx=0;sx<Rlt.feed.entry[i].category.length;sx++)if("Complete"==Rlt.feed.entry[i].category[sx].term)Status='<span class="status Completed">Completed</span>';

     for(Color=[],sx=0;sx<Rlt.feed.entry[i].category.length;sx++)if("Full Color"==Rlt.feed.entry[i].category[sx].term)Color='<span class="colored"><i class="fas fa-palette" aria-hidden="true"></i> Color</span>';

     for(Hots=[],sx=0;sx<Rlt.feed.entry[i].category.length;sx++)if("Hot"==Rlt.feed.entry[i].category[sx].term)Hots='<span class="hotx"><i class="fab fa-hotjar"></i></span>';

     htmlRltd +='<div class="bs"><div class="bsx"><a class="Url-Item-Bsx" href="'+urlBs+'" title="'+nameBs+'"><div class="limit"><div class="ply"></div>'+Status+''+Tipe+''+Color+''+Hots+''+thumb+'</div><div class="bigor"><div class="tt"> '+nameBs+'</div><div class="adds"><div class="epxs"></div><div class="rt"><div class="rating"><div class="rating-prc"><div class="rtp"><div class="rtb"><span '+PrsnRate+'></span></div></div></div><div class="numscore">'+TtlRate+'</div></div></div></div></div></a></div></div>';

  }

  $('.postarea .bixbox .listupd').each(function(){
   $(this).html(htmlRltd)   
   
   // Chapter Bawah
   $(this).find('.Url-Item-Bsx').each(function(){
     var closestDataBs = $(this).closest('.bs');
     var getDataBs = $(this).attr('href');
     var CallBackChapterBs = getDataBs.split("/").pop().replace('.html','');

     var ExpresSionBs = new RegExp(CallBackChapterBs, "i");

     $.ajax({
         type: 'GET',
         url: '/feeds/pages/default?alt=json',
         dataType: 'json'
     }).done(function(BSdata) {
       var htmlBS ='';
       var dataBS = [];

       $.each(BSdata.feed.entry, function(key, value){
         if (value.link[2].href.search(ExpresSionBs) != -1 ){
           var BStitle = value.title.$t;
           dataBS.push({title: {$t: BStitle}})
         }
       });

       if ( dataBS.length > 0 ){
            dataBS.length = 1;
           Object.values(dataBS).map(item => {
             var titleBS = item.title.$t.split('Chapter');
            
             var NumberTitle ='';
             
            for(var ii = 0; ii < titleBS.length; ii++){
             NumberTitle = titleBS[1].replace(/[^0-9\.]+/g,"");
            }

            htmlBS +='Chapter '+NumberTitle+'';

           });
          }

          $(closestDataBs).each(function(){
            $(this).find('.epxs').html(htmlBS);
           })

     });

   });
   // end Chapter Bawah

  })
 
});

                    allChapter+='<a href="'+posturl1+'">'+posttitle1+'</a>';

                    breadcrumb+='<ol itemscope="" itemtype="http://schema.org/BreadcrumbList"><li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"><a href="'+location.origin+'" itemprop="item"><span itemprop="name">'+nameHomePage+'</span></a><meta content="1" itemprop="position"></li> › <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"><a itemprop="item" href="'+posturl1+'"><span itemprop="name">'+posttitle1+'</span></a><meta content="2" itemprop="position"></li> › <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"><a href="'+hF+'" itemprop="item"><span itemprop="name">'+pT+'</span></a><meta content="3" itemprop="position"></li></ol>';

                    NavBiodataMelayang +='<a href="'+posturl1+'"><i class="fas fa-angle-double-left" aria-hidden="true"></i></a>';

                    NavBookmark +='<span class="bookmark DG-BOOKMARK" id="ID-'+postID1+'" data-type="'+Type+'" data-name="'+posttitle1+'" data-url="'+posturl1+'" data-image="'+thumb1+'" data-rate="'+TotalRate1+'" data-widthRate="'+PrsnRate1+'"> <i aria-hidden="true" class="far fa-bookmark"></i> Bookmark</span>';

                    chdesc+=`<p> Read the latest manga <b>
`+pT+` </b> at <b>
`+nameHomePage+`
</b>. Manga <b>
`+posttitle1+`
</b> is always updated at <b>
`+nameHomePage+`
</b>. Dont forget to read the other manga updates. A list of manga collections <b>
`+nameHomePage+`
</b> is in the Manga List menu.</p>`

                   } 
                  }


                 $('.chapterbody').each(function(){
                  $(this).find('.allc').append(allChapter);
                 })
                 
                 $('#ts-breadcrumb').each(function(){
                  $(this).addClass('ts-breadcrumb bixbox')
                  $(this).html(breadcrumb);
                })

                 $('.chdesc').each(function(){
                 $(this).html(chdesc)
                })
             
                 $('.daw.backseries').each(function(){
                  $(this).html(NavBiodataMelayang)
                 })

                 $('.navrig .selector.readingmode.l').each(function(){
                  $(this).html(NavBookmark)
                  // JS BookMark

                  displayVisited();

                  $('.DG-BOOKMARK').click(function(e){
                    var borkimage = $(this).attr('data-image');
	            var id = $(this).attr("id")
                    var ling = $(this).attr('data-url');
                    var title = $(this).attr('data-name');
                    var type = $(this).attr('data-type');
                    var rate = $(this).attr('data-rate');
                    var widthRate = $(this).attr('data-widthrate');
                    toggleVisited(id,borkimage,ling,title,type,rate,widthRate);
                  })

function displayVisited() {
  $('.DG-BOOKMARK').removeClass('marked')
  var ActiveIdsBookmark = getActiveIdsBookmark();
  if (ActiveIdsBookmark.length > 0) {
    var idString = '#' + ActiveIdsBookmark.join(",#");
    $(idString).closest('.DG-BOOKMARK').addClass('marked');
    $(idString).closest('.DG-BOOKMARK').html('<i aria-hidden="true" class="fas fa-bookmark"></i> Bookmarked');
  }
}

 function toggleVisited(id,borkimage,ling,title,type,rate,widthRate) {
  var ActiveIdsBookmark = getActiveIdsBookmark();
  if ($.inArray(id, ActiveIdsBookmark) === -1) {
    ActiveIdsBookmark.push(id);
    addarticle(id, title, ling, borkimage, type, rate, widthRate)
  } else {
    ActiveIdsBookmark = removeVisited(ActiveIdsBookmark, id);
    var src = id.split('-')[1];
    removearticle(src)
    $('.DG-BOOKMARK').html('<i aria-hidden="true" class="far fa-bookmark"></i> Bookmark');
  }
  localStorage.setItem("BookmarkID", ActiveIdsBookmark.join(','));
  displayVisited();
 }

function removeVisited(storedIds, removedId) {
  var cleanIds = [];
  // if the given id is in our array, remove it
  if ($.inArray(removedId, storedIds) !== -1) {
    $.each(storedIds, function(i, currentId) {
      if (currentId !== removedId) {
        cleanIds.push(currentId);
      }
    });
  }
  return cleanIds;
}

 function getActiveIdsBookmark() {
  var ActiveIdsBookmark = localStorage.getItem("BookmarkID");
  return ActiveIdsBookmark ? ActiveIdsBookmark.split(',') : [];
}

var setAllBookmark = function(Bookmark){
  localStorage.Bookmark = JSON.stringify(Bookmark);
}

var addarticle = function(id, title, ling, borkimage, type, rate, widthRate) {
  var Bookmark = getAllBookmark();
  Bookmark.push({
  code: id.split('-')[1],
  title: title,
  link: ling,
  borkimage: borkimage,
  type: type,
  rate: rate,
  widthRate: widthRate
  });
  setAllBookmark(Bookmark);
}

var getAllBookmark = function(){
  try {
  var Bookmark = JSON.parse(localStorage.Bookmark);
  return Bookmark;
  } catch (e) {
  return [];
  }
}

var removearticle = function(src){
  var Bookmark = getAllBookmark();
  Bookmark = $.grep(Bookmark, function(value, index) {
    return value.code != src;
  });
  setAllBookmark(Bookmark);
}


                  // end JS BookMark
                 })

              });

              var dataStyle ='<style>#sidebar {display: none !important;}.postbody {float: left;width: 100% !important;}.post-outer .chdesc {text-align: center;margin: 0 auto;margin-bottom: 25px;max-width: 1142px;}body.lightmode {background-color: #16151d;color: #b8b8b8;}.lightmode .th {background: #0b0a0d;}.lightmode .bixbox {background: #222;}.lightmode .searchx #form #q {background-color: #17151b;border: 1px solid #23202a;color: #fff;}.post-outer .chaptertags {max-width: 1142px;margin: 0 auto;margin-bottom: 15px;background: #222;overflow: hidden;border-radius: 3px;padding: 0 15px;font-size: 13px;}.selector.readingmode.l .bookmark.DG-BOOKMARK {width: 100%;float: left;font-family: inherit;padding: 5px 10px;padding-left: 10px;padding-right: 10px;border-radius: 20px;}@media only screen and (max-width: 650px){.chnav.ctop.nomirror .slc {float: left;width: 50%;}}@media only screen and (max-width: 800px){.headpost, .post-outer .bixbox, .post-outer .chdesc, .chnav, .post-outer .chaptertags {margin-left: 20px;margin-right: 20px;}.nextprev {overflow: hidden;text-align: center;}}</style>';

              var prevnext ='<span class="navlef"> <span class="npv r"><div class="nextprev"> <a class="ch-prev-btn disabled" rel="prev"> <i class="fas fa-angle-left"></i> Prev </a> <a class="ch-next-btn disabled" rel="next"> Next <i class="fas fa-angle-right"></i> </a></div> </span><span class="amob"> <span class="selector pagedsel r"> <select name="select-paged" class="ts-select-paged" id="select-paged"></select></span></span> '+buttonDownload+' </span>';

              var prevnextt ='<span class="amob"> <span class="npv r"><div class="nextprev"> <a class="ch-prev-btn disabled" rel="prev"> <i class="fas fa-angle-left"></i> Prev </a> <a class="ch-next-btn disabled" rel="next"> Next <i class="fas fa-angle-right"></i> </a></div> </span> <span class="selector pagedsel r"> <select name="select-paged" class="ts-select-paged" id="select-paged"></select></span></span>';

              var tagsbawah ='<div class="chaptertags"><p>tags: read manga '+posttitle+', comic '+posttitle+', read '+posttitle+' online, '+posttitle+' new chapter, '+posttitle+' update chapter, '+posttitle+' high quality, '+posttitle+' manga scan, '+date+', '+author+'</p></div>';

              var comment = "";

              var scriptt = `<\script>

    var disqus_config = function () {
        this.page.url = '${hF}'; 
        this.page.identifier = '/${CallBackChapter[0]}.html';
    };

    (function() {  
        var d = document, s = d.createElement('script');
        
        s.src = 'https://mangasidu.disqus.com/embed.js';  
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
  <\/script>
  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>`

              var relatedSeries = '<div class="bixbox"><div class="releases"><h2><span>Related Series</span></h2></div><div class="listupd"><div class="center-content"><span class="loading-content">Memuat...</span></div></div></div>';

              var columnbixbox = ""+relatedSeries+"<div class='bixbox comments-area' id='comments'><div class='releases'><h2><span>Comment</span></h2></div><div class='cmt commentx'><div id='disqus_thread'>"+comment+"</div></div></div>"+scriptt+"";

             var navBiotop = '<div class="readingnav rnavtop" id="NavTop"><div class="readingnavtop"><div class="daw backseries"><a '+urlDownloadUP+'><i class="fas fa-angle-double-left"></i></a></div><div class="daw chpnw">Chapter '+pT.split('Chapter')[1].replace(/[^0-9\.]+/g,"")+'</div>'+buttonUPdownload+'</div><div class="rdnmx rdtop"></div></div>';

             var nextPrevtop = '<div class="readingnav rnavbot" id="NavBottom"><div class="rdnmx rdbot"></div><div class="readingnavbot"><div class="readingbar"><div class="readingprogress" style="width: 0px;"></div></div><div class="readingoption"><span class="selectorx slc l"><div class="nvx"><select name="chapter" id="chapter" onchange="this.options[this.selectedIndex].value&amp;&amp;window.open(this.options[this.selectedIndex].value,`_self`)"></select></div></span><div class="btm-np nextprev"><a class="ch-prev-btn disabled" rel="prev"><i class="fas fa-arrow-left"></i></a><span class="selectorx pagedsel r"> <select name="select-paged" class="ts-select-paged" id="select-paged"></select></span> <a class="ch-next-btn disabled" rel="next"><i class="fas fa-arrow-right"></i></a></div></div></div></div>'
   
              htmlcode +=''+dataStyle+'<div class="chapterbody"><div class="postarea"><article class="post-151 hentry" id="post-151" itemscope="itemscope" itemtype="http://schema.org/CreativeWork"><div class="headpost"><h1 class="entry-title" itemprop="name">'+posttitle+'</h1><div class="allc">All chapters are in </div></div> <div class="socialts"><a class="fb" href="http://www.facebook.com/sharer.php?u='+posturl+'" rel="nofollow" target="blank"><i class="fab fa-facebook-f" aria-hidden="true"></i><span>Facebook</span></a> <a class="twt" href="http://twitter.com/intent/tweet?url='+posturl+'&amp;text='+posttitle+'" rel="nofollow" target="blank"><i class="fab fa-twitter" aria-hidden="true"></i><span>Twitter</span></a> <a class="wa" data-action="share/whatsapp/share" href="whatsapp://send?text='+posttitle+'%20%2D%20'+posturl+'"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a> <a class="pntrs" href="http://pinterest.com/pin/create/button/?url='+posturl+'&amp;media='+thumb+'&amp;description='+posttitle+'" rel="nofollow" target="blank"><i class="fab fa-pinterest-p" aria-hidden="true"></i><span>Pinterest</span></a></div> <div id="ts-breadcrumb"></div> <div class="entry-content entry-content-single maincontent" itemprop="description"><div class="chdesc"></div><div class="chnav ctop nomirror"><span class="selector slc l"><div class="nvx"><select id="chapter" name="chapter" onchange="this.options[this.selectedIndex].value&amp;&amp;window.open(this.options[this.selectedIndex].value,`_self`)"></select></div></span><span class="navrig"> <span class="selector readingmode l"><span class="bookmark DG-BOOKMARK"> <i aria-hidden="true" class="far fa-bookmark"></i> Bookmark</span></span></span>'+prevnext+'</div><div id="readerarea">'+testData+'</div><div class="chnav cbot"><span class="selector slc l"><div class="nvx"> <select name="chapter" id="chapter" onchange="this.options[this.selectedIndex].value&amp;&amp;window.open(this.options[this.selectedIndex].value,`_self`)"></select></div></span>'+prevnextt+'</div></div>'+tagsbawah+' '+columnbixbox+'</article></div></div>'+navBiotop+nextPrevtop+'';
              } else {
              if (content.indexOf("[infoWebsite]") > -1 ) {
              } else {
              $("#pageloader").fadeOut();
               }
             }

          }
          if (data.feed.entry[i].link[j].href.search(infoxExpresSion) != -1 ){
          eU[k] = "'" + data.feed.entry[i].link[j].href + "'";//bs
         eT[k] = data.feed.entry[i].title.$t;
         k++;
         
         
          }
          }

         $('.post.hentry').each(function(){
            if(htmlcode === "") {
            $(this).find('.bixbox').removeAttr('style');
            var dataClst = $('#area-Bookmark').closest('.bixbox');
            $(dataClst).find('.data-ntf').html('<p class="ntf"> You can save a list of manga titles here up to 50. The list approves based on the latest update date. The list of manga is stored in a browser that you can use right now.</p>')
            $(dataClst).find('.releases').append('<span class="hapus" id="hapus">Delete</span>');
            var toggled = false;
            $('span#hapus').click(function(){
              toggled = !toggled;
              $(".delmark").attr("style", toggled ? "display:block;" : "display:none;");
            })
             } else {
            $(this).html(htmlcode)
            $(this).find('select#chapter').html('<option value="#">Select Chapter</option>'+selectCahpter+'')
            this.querySelectorAll("#readerarea div").forEach(EL => EL.replaceWith(...EL.childNodes));
            this.querySelectorAll("#readerarea a").forEach(eL => eL.replaceWith(...eL.childNodes));
            $(this).find('#readerarea img').addClass('ImageComic')

            // js hover
            
            $('.ImageComic').mouseover(function(){
             $(this).addClass('curdown')
            }) 
            $('.ImageComic').mouseout(function(){
             $(this).removeClass('curdown');
            });
            $('.ImageComic').bind('contextmenu', function(e) {
                return false;
            }); 
           
            // end js hover

            var AddDataIndex = $('#readerarea').find('img');
           
            for (var i = 0 ; i < AddDataIndex.length; i++){
                if (i < 10){
                var dataImg = '0'
                } else {
                var dataImg =''
                }
                AddDataIndex[i].setAttribute('data-index', ''+i+'' )
                AddDataIndex[i].setAttribute('id', ''+dataImg+i+'' )
            }

            $('.selector.pagedsel.r #select-paged').on('change', function (e) {
              $(this).removeAttr('selected')
               var dataValueIndex = $("option:selected", this)
               var valueSelected = this.value;

               document.querySelector(`#readerarea > img[id *= "${valueSelected}"]`).scrollIntoView();
             })

             $('.selectorx.pagedsel.r #select-paged').on('change', function (e) {
            
               var dataValueIndex = $("option:selected", this)

               var valueSelected = this.value;
               document.querySelector(`#readerarea > img[id *= "${valueSelected}"]`).scrollIntoView();
             })
           
             $(window).bind("scroll", function() {

               $('.ImageComic').isInViewport().each(function(){
                 var dataIndexElement = $(this).attr('data-index');

                 $('#select-paged > option').removeAttr('selected');
                 if (dataIndexElement < 10) {
                  var dataplusNol = '0';
                 } else {
                  var dataplusNol ='';
                 }

                 $('#select-paged > option[value *= "'+dataplusNol+dataIndexElement+'"]').attr('selected',true);
               })

           });
             

             var testPush = []
             var htmlPush = ''
             var dataIndex = ''
             var testCode = $('#readerarea').find('.ImageComic');
             $.each($('.ImageComic'), function(key, value){
             testPush.push(value.src)
             })
             
             testPush.forEach(function (url, i) {
               if (i < 10){
                var dataiplus ='0';
               } else {
                var dataiplus = '';
               }
               var iplus = i +1      
               htmlPush +='<option value="'+dataiplus+i+'">'+ iplus +'/'+testPush.length+'</option>';
              });
            
              $('select#select-paged').each(function(){
               $(this).html(htmlPush)
              })
              

               $(".readingnav.rnavbot#NavBottom").click(function(){
		       	$(".darkmode.black").toggleClass("hidenopt");
		       });
               $(".readingoption .nvx").click(function(){
		       	$(".darkmode.black").toggleClass("hidenopt");
               });

              $('.readingnavbot .btm-np.nextprev').click(function(){
               $(".darkmode.black").toggleClass("hidenopt");
               });

             $("#readerarea img").click(function(){
		       	$(".darkmode.black").toggleClass("hidenopt");
               });

             $(".autoDownloader").click(function(){
              $('body').append('<div class="donwloader"><div class="restdownload"><div class="latar-belakang restDownload"></div><div class="layoutDownload"><div class="restitle"> Download </div><div class="resdescp"> Anda Saat Ini Akan Mendownload "'+pT+'" Silakan Tekan Download Untuk Memulai Downloader &amp; Tekan Close Untuk Menutup Tampilan Downloader Ini. </div><div class="resconfirm"><div class="rescb enterx">Download</div><div class="rescb exitx">Close</div></div></div></div></div>');

              $('.rescb.exitx').click(function(){
               $('.donwloader').remove();
             })
              $('.latar-belakang.restDownload').click(function(){
               $('.donwloader').remove();
             })

             var DownloadUP = [];
             $('.rescb.enterx').click(function(){
                $.each($('.ImageComic'), function(key, value){
                DownloadUP.push($(value).attr('src'))
                })
                var zip = new JSZip();
                var count = 0;
                var dataNameZip = ""+CallBackChapter+""
                var zipFilename = dataNameZip.split(',')[0] +".zip";
                DownloadUP.forEach(function (url, i) {
                 let filename = DownloadUP[i];

                 JSZipUtils.getBinaryContent(url, function (err, data) {
                   if (err) {
                     throw err; 
                   }
                   zip.file("Images " + i +".jpg", data, { origin: DownloadUP[i] });
                   count++;
                   if (count == DownloadUP.length) {
                   zip.generateAsync({ type: 'blob' }).then(function (content) {
                     saveAs(content, zipFilename);
                   });
                   }
                 });

                })
             })

             })

             $(window).scroll(function() {
               var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
               var height = document.getElementById('readerarea').scrollHeight || document.getElementById('readerarea').clientHeight;
               var scrolled = (winScroll / height) * 100;
               var dataText = ""+scrolled+""

               if (dataText.split('.')[0] < 101) {   

               if ($(window).scrollTop() > 200) {
               $('.readingnav.rnavtop#NavTop').fadeIn();
               $('.readingnav.rnavbot#NavBottom').fadeIn();
               } else {
                 $('.readingnav.rnavtop#NavTop').fadeOut();
                 $('.readingnav.rnavbot#NavBottom').fadeOut();
               }

               
               $('.readingprogress').css('width', dataText.split('.')[0]  + "%")
               }
               if (dataText.split('.')[0] > 100) {
                 $('.readingnav.rnavtop#NavTop').removeAttr('style');
                 $('.readingnav.rnavbot#NavBottom').removeAttr('style');
               }
       		
             });

            }

          })
         
        for(var i=0;i<k;i++){
         if(eT[i]==pT)
           current=i;
         }

        var linkMines = current-1;
        var linkPluss = current+1;

        if(eU[linkPluss] === undefined) {
        } else {
          $('.ch-prev-btn').removeClass('disabled')
          $('.ch-prev-btn').attr('href',eU[linkPluss].split("'")[1])
        }

        if(eU[linkMines] === undefined) {
        } else {
          $('.ch-next-btn').removeClass('disabled')
          $('.ch-next-btn').attr('href',eU[linkMines].split("'")[1])
        }

   });

 $('#area-Bookmark').each(function(){
    
    function getActiveIdsBookmark() {
        var ActiveIdsBookmark = localStorage.getItem("BookmarkID");
        return ActiveIdsBookmark ? ActiveIdsBookmark.split(',') : [];
    }
    var setAllBookmark = function (Bookmark) {
        localStorage.Bookmark = JSON.stringify(Bookmark);
    };
        

    let cartItem = localStorage.getItem("Bookmark");
        cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector('#area-Bookmark');
    var htmlBookmark = '';
    if (cartItem.length > 0 && productContainer) {
        cartItem.length = 50;

            Object.values(cartItem).map(item => {
                htmlBookmark +=`
           <div class="bs">
           <div data-id="${item.code}" id="${item.code}-book" data-src="${item.borkimage}" class="bsx">
           <div class="delmark" style="display:none;">Delete</div>
           <a href="${item.link}" title="${item.title}">
           <div class="limit">
           <div class="ply"></div>
           <img src="${item.borkimage}" class="ts-post-image wp-post-image attachment-medium size-medium" loading="lazy" width="165" height="225"/>
           </div>
           <div class="bigor">
           <div class="tt">${item.title}</div>
           <div class="adds">
<div class="epxs"></div>
<div class="rt">
<div class="rating">
<div class="rating-prc" itemprop="aggregateRating" itemscope="itemscope" itemtype="//schema.org/AggregateRating">
<div class="rtp">
<div class="rtb">
<span style="width:0%;"></span>
</div>
</div>
</div>
<div class="numscore">N/A</div>
</div>
</div>
</div>
           </div>
           </a>
           </div>
           </div>
           `;

                 });
             }

        $(productContainer).each(function(){
         if(htmlBookmark === "") {
        } else {
         $(this).html(htmlBookmark)

var DataE = $('.bsx').closest('.bs');
$(DataE).each(function(){
var DataThis = $(this);
var ThisUrl = $(this).find('a').attr('href');
var CallBackSeries = ThisUrl.split("/").pop().split('.html')[0];
var infoxExpresSionSeries = new RegExp(CallBackSeries, "i");

$.ajax({
    type: 'GET',
    url: '/feeds/posts/default/-/Series?alt=json',
    dataType: 'json'
}).done(function(data) {
   var HtmlCode = "";
   var DataStatus ="";
   var ratehtml ='';
   var ratepersen ='';
    for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }

      if (posturl.search(infoxExpresSionSeries) != -1 ){
        var content = data.feed.entry[i].content.$t,
            $content = $('<div>').html(content);

        for(Tipe=[],sx=0;sx<data.feed.entry[i].category.length;sx++)if("Manga"==data.feed.entry[i].category[sx].term)Tipe='<span class="type Manga"></span>';else if("Manhua"==data.feed.entry[i].category[sx].term)Tipe='<span class="type Manhua"></span>';else if("Manhwa"==data.feed.entry[i].category[sx].term)Tipe='<span class="type Manhwa"></span>';

         for(Status=[],sx=0;sx<data.feed.entry[i].category.length;sx++)if("Complete"==data.feed.entry[i].category[sx].term)Status='<span class="status Completed">Completed</span>';

         for(Color=[],sx=0;sx<data.feed.entry[i].category.length;sx++)if("Full Color"==data.feed.entry[i].category[sx].term)Color='<span class="colored"><i class="fas fa-palette" aria-hidden="true"></i> Color</span>';

         for(Hots=[],sx=0;sx<data.feed.entry[i].category.length;sx++)if("Hot"==data.feed.entry[i].category[sx].term)Hots='<span class="hotx"><i class="fab fa-hotjar"></i></span>';

         if (content.indexOf("RateSeries") > -1 ) {
                   var TotalRate = $content.find('.TotalRate').html();
                   var TtlRate = ''+TotalRate+'';

                  var PersenRate = $content.find('.PersenRate').html();
                  var PrsnRate = ''+PersenRate+'';
                 } else {
                  var TtlRate = 'N/A';
                  var PrsnRate = '0%';
                 }

        DataStatus=""+Tipe+Status+Color+Hots+"";
        ratehtml=""+TtlRate+"";
        ratepersen=""+PrsnRate+"";

      }
    }

    $(DataThis).each(function(){
     $(this).find('.limit').append(DataStatus)
     $(this).find('.adds span').attr('style','width:'+ratepersen+'')
     $(this).find('.adds .numscore').html(ratehtml);
    });

});

$.ajax({
    type: 'GET',
    url: '/feeds/pages/default?alt=json',
    dataType: 'json'
}).done(function(datac) {
   var htmlCode ='';
   var data = [];

   $.each(datac.feed.entry, function(key, value){
      if (value.link[2].href.search(infoxExpresSionSeries) != -1 ){
              var title = value.title.$t;
              data.push({title: {$t: title}})
            }
          });

   if ( data.length > 0 ){
            data.length = 1;
           Object.values(data).map(item => {
             var posttitle = item.title.$t.split('Chapter');
            
             var NumberTitle ='';
             
            for(var ii = 0; ii < posttitle.length; ii++){
             NumberTitle = posttitle[1].replace(/[^0-9\.]+/g,"");
            }

            htmlCode +='Chapter '+NumberTitle+'';

           });
          }


     $(DataThis).each(function(){
      $(this).find('.epxs').html(htmlCode)
     })

});

});
        }
        })


    $('.delmark').click(function(){
     var dataclosest = $(this).closest('.bs');
     var src = $(dataclosest).find('.bsx').attr('data-id');
     removearticle(src);
     var dataSrc = ''+src+''
     removearticle2(dataSrc);
     $(dataclosest).remove();

     var itemList = $('.bs');
     var counterList = 0;
     if(counterList >= itemList.length){
       $('#area-Bookmark').html(`<h4><center>YOU HAVE NO BOOKMARK, NOTHING TO SHOW</center></h4>`);
     } else {
     }

    })
    var getAllBookmark = function () {
        try {
            var Bookmark = JSON.parse(localStorage.Bookmark);
            return Bookmark;
        }
        catch (e) {
            return [];
        }
    };

    var removearticle = function (src) {
        var Bookmark = getAllBookmark();
        Bookmark = $.grep(Bookmark, function (value, index) {
            return value.code != src;
        });
        setAllBookmark(Bookmark);
    };
    var removearticle2 = function (dataSrc) {
        var ActiveIdsBookmark = getActiveIdsBookmark();
        // if the given id is in our array, remove it
        ActiveIdsBookmark = $.grep(ActiveIdsBookmark, function (i) {
            return (i != dataSrc);
        });
        setarticleall(ActiveIdsBookmark);
    };
    var setarticleall = function (ActiveIdsBookmark) {
        localStorage.setItem("BookmarkID", ActiveIdsBookmark.join(','));
    };


 });
} else {
    setTimeout(function(){
            window.location.href = 'https://mangasidu.blogspot.com/';
         }, 10000);
    $('body').html(`<div class="Pengumuman" style="padding:15px;">Anda Saat Ini Sedang Memakai Javascript Tanpa Ijin Dari Pembuat Javascript Ini dan Dalam 10 Seconds Anda Akan Di arahkan Ke Page Author... Mohon Segera Menghubungi Pembuat Javascript Untuk Meminta Ijin Pengunaan Javascript Ini... 
     
      By DockGo Rewin ( Author Javascript )</div>`)
  }
  });
