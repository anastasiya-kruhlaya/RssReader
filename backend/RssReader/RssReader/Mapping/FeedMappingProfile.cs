using AutoMapper;
using RssReader.DTOs.Feed;
using RssReader.Models;

namespace RssReader.Mapping;

public class FeedMappingProfile : Profile
{
    public FeedMappingProfile()
    {
        CreateMap<UpdateFeedDto, Feed>()
            .ForMember(dest => dest.Url, opt => opt.Ignore())
            .ForMember(dest => dest.LastUpdated, opt => opt.Ignore());
    }
}
