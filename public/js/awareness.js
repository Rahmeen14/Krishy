var images_list = [
	"http://www.aftfund.org/sites/default/files/banner_agriculture.png",
	"https://smedia2.intoday.in/btmt/images/stories/farmingindia_660_081117025209.jpg", 
	"https://media.licdn.com/mpr/mpr/AAIA_wDGAAAAAQAAAAAAAA3VAAAAJGJlN2MwN2ExLWY4YmUtNDg5ZC1iNWJkLWMxMzUyMzI3ZGJmMg.jpg",
	"http://chtenvis.nic.in/images/Agriculture.jpg",
	"https://www.infosys.com/SiteCollectionImages/renew-create-agriculture-enterprise.jpg",
	"http://www.tatachemicals.com/upload/images/masthead/Agriculture.jpg"
];
var i = 0;

function changeImages()
{
	var image = document.getElementsByTagName('img')[0];
	setTimeout(function(){
		i++;
		if(i%6 == 0)
		{
			image.setAttribute("src", images_list[0]);
		}
		else if(i%6 == 1)
		{
			image.setAttribute("src", images_list[1]);
		}
		else if(i%6 == 2)
		{
			image.setAttribute("src", images_list[2]);
		}
		else if(i%6 == 3)
		{
			image.setAttribute("src", images_list[3]);
		}
		else if(i%6 == 4)
		{
			image.setAttribute("src", images_list[4]);
		}
		else if(i%6 == 5)
		{
			image.setAttribute("src", images_list[5]);
		}

		changeImages();

	}, 2000);
	
	
}